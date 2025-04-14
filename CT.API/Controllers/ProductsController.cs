using CT.Application.Products.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CT.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<IActionResult> Get(int count)
        {
            var productList = await _mediator.Send(new GetProductListQuery(count));

            return Ok(productList);
        }


    }
}
