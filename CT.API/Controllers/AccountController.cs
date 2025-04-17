using CT.API.Contracts.Requests;
using CT.Application.Users.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

namespace CT.API.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class AccountController : ControllerBase
{
    private readonly IMediator _mediator;

    public AccountController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> SignIn([FromBody] SignInRequest request)
    {
        
        if (string.IsNullOrEmpty(request.Email)) return BadRequest(Resources.EmailIsRequired);

        if (string.IsNullOrEmpty(request.Password)) return BadRequest(Resources.PasswordIsRequired);

        var productList =
            await _mediator.Send(
                new AuthenticateUserCommand(request.Email, request.Password));
        if (productList.Error != null) return Unauthorized(productList.Error.ToString());

        return Ok(productList);
    }

    [HttpGet]
    public IActionResult GetCurrentUserData()
    {
        var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        var userName = User.FindFirst(JwtRegisteredClaimNames.Name)?.Value;
        var userEmail = User.FindFirst(JwtRegisteredClaimNames.Email)?.Value;

        return Ok(new { userId, userName, userEmail });
    }
}