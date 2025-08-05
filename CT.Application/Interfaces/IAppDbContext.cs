using CT.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CT.Application.Interfaces;

public interface IAppDbContext
{
    bool CanConnect();
    DbSet<User> Users { get; }
    DbSet<Product> Products { get; }
    DbSet<Order> Orders { get; }
    DbSet<OrderItem> OrderItems { get; }
    DbSet<RefreshToken> RefreshTokens { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}