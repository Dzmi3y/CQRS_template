using CT.Domain.Entities;

namespace CT.Domain.Interfaces.Repositories
{
    public interface IProductRepository
    {
        Task<List<Product>> GetListAsync(int count);

    }
}
