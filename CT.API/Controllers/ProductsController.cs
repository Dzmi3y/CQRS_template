using CT.API.Contracts.Requests;
using CT.Application.Products.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Diagnostics;

namespace CT.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProductsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> Get(GetProductsRequest request)

    {
        var productList = await _mediator.Send(new GetProductListQuery(request.Count, request.IsSet));

        return Ok(productList);
    }
}