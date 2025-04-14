
using CT.Domain.Entities;
using CT.Domain.Interfaces.Repositories;
using MediatR;

namespace CT.Application.Products.Queries
{
    public class GetProductListHandler : IRequestHandler<GetProductListQuery, List<Product>>
    {
        private readonly IProductRepository _productRepository;

        public GetProductListHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        public async Task<List<Product>> Handle(GetProductListQuery request, CancellationToken cancellationToken)
        {
            return await _productRepository.GetListAsync(request.count);
        }
    }
}
