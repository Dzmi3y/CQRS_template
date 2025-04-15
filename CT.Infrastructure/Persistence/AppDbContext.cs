using System.Linq.Expressions;
using CT.Application.Interfaces;
using CT.Domain.Entities;
using CT.Domain.Entities.Base;
using CT.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CT.Infrastructure.Persistence;

public class AppDbContext : DbContext, IAppDbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateAuditProperties();
        return base.SaveChangesAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        SetRelationsAndIndexes(modelBuilder);
        ApplyGlobalIsDeletedFilter(modelBuilder);
    }

    private static void SetRelationsAndIndexes(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<OrderItem>().HasKey(oi => new { oi.OrderId, oi.ProductId });
        modelBuilder.Entity<OrderItem>().HasOne(oi => oi.Order)
            .WithMany(o => o.OrderItems)
            .HasForeignKey(oi => oi.OrderId);

        modelBuilder.Entity<Order>().Property(o => o.Status)
            .HasConversion(new EnumToStringConverter<OrderStatus>());
        modelBuilder.Entity<Order>().HasOne(o => o.User)
            .WithMany(u => u.Orders)
            .HasForeignKey(o => o.UserId);

        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        modelBuilder.Entity<User>().HasMany(u => u.RefreshTokens)
            .WithOne(rt => rt.User)
            .HasForeignKey(rt => rt.UserId);

        modelBuilder.Entity<RefreshToken>().HasIndex(rt => rt.Token).IsUnique();
        modelBuilder.Entity<Product>().HasIndex(p => p.Name).IsUnique();
        modelBuilder.Entity<Product>().Property(p => p.Type)
            .HasConversion(new EnumToStringConverter<ProductType>());

        InitHelper.InitUser(modelBuilder);
        InitHelper.InitProducts(modelBuilder);
    }

    private static void ApplyGlobalIsDeletedFilter(ModelBuilder modelBuilder)
    {
        Expression<Func<AuditableEntity, bool>> expression = entity => !entity.IsDeleted;
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (entityType.ClrType.BaseType != typeof(AuditableEntity)) continue;

            var newParam = Expression.Parameter(entityType.ClrType);
            var newBody =
                ReplacingExpressionVisitor.Replace(expression.Parameters.Single(), newParam, expression.Body);
            modelBuilder.Entity(entityType.ClrType).HasQueryFilter(Expression.Lambda(newBody, newParam));
        }
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess,
        CancellationToken cancellationToken = default)
    {
        UpdateAuditProperties();
        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }

    public override int SaveChanges()
    {
        UpdateAuditProperties();
        return base.SaveChanges();
    }

    public override int SaveChanges(bool acceptAllChangesOnSuccess)
    {
        UpdateAuditProperties();
        return base.SaveChanges(acceptAllChangesOnSuccess);
    }

    private void UpdateAuditProperties()
    {
        var now = DateTime.UtcNow;

        ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Added)
            .Select(e => e.Entity as AuditableEntity)
            .Where(e => e != null)
            .ToList()
            .ForEach(e => e.CreatedDateUtc = now);

        ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified)
            .Select(e => e.Entity as AuditableEntity)
            .Where(e => e != null)
            .ToList()
            .ForEach(e => e.ModifiedDateUtc = now);
    }
}