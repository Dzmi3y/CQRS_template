
using CT.Domain.Entities;
using CT.Domain.Interfaces.Repositories;

namespace CT.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        public Task<List<Product>> GetListAsync(int count)
        {

            var products = new List<Product>
            {
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Makaron",
                    ImageUrl = "https://example.com/images/makaron.jpg",
                    Price = 2.99m
                },
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Cupcake",
                    ImageUrl = "https://example.com/images/cupcake.jpg",
                    Price = 1.99m
                }
            };


            return Task.FromResult<List<Product>>(products.Take(count).ToList());

        }
    }
}
