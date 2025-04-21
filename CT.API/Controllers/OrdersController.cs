using CT.API.Contracts.Requests;
using CT.Application.Orders.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

namespace CT.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IMediator _mediator;

    public OrdersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Post(CreateOrderRequest request)
    {
        if (request == null) return BadRequest(Resources.RequestCannotBeNull);

        if (request.OrderList == null || request.OrderList.Count == 0)
            return BadRequest(Resources.OrderListCannotBeEmpty);

        var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        var result = await _mediator.Send(new CreateOrderCommand(userId, request.OrderList));

        return Ok(result);
    }
}