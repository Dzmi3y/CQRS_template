using CT.API.Contracts.Requests;
using CT.Application.Enums;
using CT.Application.Users.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

namespace CT.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AccountController : ControllerBase
{
    private readonly IMediator _mediator;

    public AccountController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] SignInRequest request)
    {
        if (string.IsNullOrEmpty(request.Email)) return BadRequest(Resources.EmailIsRequired);

        if (string.IsNullOrEmpty(request.Password)) return BadRequest(Resources.PasswordIsRequired);

        var authResult =
            await _mediator.Send(
                new AuthenticateUserCommand(request.Email, request.Password));
        if (authResult.Error != null) return Unauthorized(authResult.Error.ToString());

        return Ok(authResult);
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] SignUpRequest request)
    {
        if (string.IsNullOrEmpty(request.Email)) return BadRequest(Resources.EmailIsRequired);

        if (string.IsNullOrEmpty(request.Password)) return BadRequest(Resources.PasswordIsRequired);

        if (string.IsNullOrEmpty(request.Name)) return BadRequest(Resources.NameIsRequired);


        var result = await _mediator.Send(
            new RegisterUserCommand(
                request.Email,
                request.Password,
                request.Name,
                request.DefaultPhone,
                request.DefaultAddress));

        if (result.Error == RegistrationErrorCode.DatabaseError)
            return StatusCode(StatusCodes.Status500InternalServerError, Resources.ServerError);

        if (result.Error != null) return BadRequest(result.Error.ToString());

        return Ok(result);
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        var jwtId = User.FindFirst(JwtRegisteredClaimNames.Jti)?.Value;

        if (string.IsNullOrEmpty(jwtId)) return BadRequest(Resources.InvalidToken);

        await _mediator.Send(new InvalidateRefreshTokenCommand(jwtId));

        return Ok(new { message = Resources.SignedOut });
    }

    [HttpGet("info")]
    public IActionResult AccountInfo()
    {
        var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        var userName = User.FindFirst(JwtRegisteredClaimNames.Name)?.Value;
        var userEmail = User.FindFirst(JwtRegisteredClaimNames.Email)?.Value;

        return Ok(new { userId, userName, userEmail });
    }
    
    [HttpPost("refresh")]
    [AllowAnonymous]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest request)
    {
        var authResult =
            await _mediator.Send(
                new RefreshTokenCommand(request.RefreshToken));
        if (authResult.Error != null) return Unauthorized(authResult.Error.ToString());

        return Ok(authResult);
    }
}