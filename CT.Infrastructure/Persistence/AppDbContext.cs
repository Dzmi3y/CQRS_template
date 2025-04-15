using System.Linq.Expressions;
using CT.Domain.Entities;
using CT.Domain.Entities.Base;
using CT.Domain.Enums;
using CT.Domain.Interfaces;
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

        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = new Guid("054bc9a7-609e-417c-a08d-f3edcf66365f"),
                Name = "Purple Macaron",
                ImageUrl = "images/macarons/purple.png",
                Price = 2.50m,
                Type = ProductType.Individually,
                CreatedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5277),
                ModifiedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5278),
                IsDeleted = false
            },
            new Product
            {
                Id = new Guid("08f35a7b-f8e8-48f3-8596-60e157c072a3"),
                Name = "Macaron set #2",
                ImageUrl = "images/macarons/set2.png",
                Price = 10.00m,
                Type = ProductType.Individually,
                CreatedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5282),
                ModifiedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5282),
                IsDeleted = false
            },
            new Product
            {
                Id = new Guid("0ea0c77b-5389-418c-bc39-aa53c7faf1d0"),
                Name = "Macaron set #6",
                ImageUrl = "images/macarons/set6.png",
                Price = 10.00m,
                Type = ProductType.Individually,
                CreatedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5295),
                ModifiedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5296),
                IsDeleted = false
            },
            new Product
            {
                Id = new Guid("35eb441d-8162-46b8-a9e4-f467639b41c1"),
                Name = "Orange Macaron",
                ImageUrl = "images/macarons/orange.png",
                Price = 2.50m,
                Type = ProductType.Individually,
                CreatedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(4986),
                ModifiedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5136),
                IsDeleted = false
            },
            new Product
            {
                Id = new Guid("3e12e305-73fb-4476-a9a7-d70d7a8d1798"),
                Name = "Macaron set #4",
                ImageUrl = "images/macarons/set4.png",
                Price = 10.00m,
                Type = ProductType.Individually,
                CreatedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5291),
                ModifiedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5291),
                IsDeleted = false
            },
            new Product
            {
                Id = new Guid("6d7d7c4b-188c-4811-9e78-65eb0d24e00e"),
                Name = "Red Macaron",
                ImageUrl = "images/macarons/red.png",
                Price = 2.50m,
                Type = ProductType.Individually,
                CreatedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5273),
                ModifiedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5273),
                IsDeleted = false
            },
            new Product
            {
                Id = new Guid("78bcfa91-cf39-4553-804e-3b6fc30e092b"),
                Name = "Pink Macaron",
                ImageUrl = "images/macarons/pink.png",
                Price = 2.50m,
                Type = ProductType.Individually,
                CreatedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5271),
                ModifiedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5271),
                IsDeleted = false
            },
            new Product
            {
                Id = new Guid("9cc9b4f4-c5a6-4c05-b471-336bd8b96794"),
                Name = "Macaron set #1",
                ImageUrl = "images/macarons/set1.png",
                Price = 10.00m,
                Type = ProductType.Individually,
                CreatedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5280),
                ModifiedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5280),
                IsDeleted = false
            },
            new Product
            {
                Id = new Guid("9f0d7ccd-94c8-4efc-890c-0c870c1964c6"),
                Name = "Dark Macaron",
                ImageUrl = "images/macarons/dark.png",
                Price = 2.50m,
                Type = ProductType.Individually,
                CreatedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5275),
                ModifiedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5276),
                IsDeleted = false
            },
            new Product
            {
                Id = new Guid("e00af05d-272a-4c9e-9383-c6b1853e4e3d"),
                Name = "Macaron set #5",
                ImageUrl = "images/macarons/set5.png",
                Price = 10.00m,
                Type = ProductType.Individually,
                CreatedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5293),
                ModifiedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5294),
                IsDeleted = false
            },
            new Product
            {
                Id = new Guid("f2361fd0-134d-4a7c-b4a5-e7948e19c0d0"),
                Name = "Macaron set #3",
                ImageUrl = "images/macarons/set3.png",
                Price = 10.00m,
                Type = ProductType.Individually,
                CreatedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5289),
                ModifiedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5289),
                IsDeleted = false
            },
            new Product
            {
                Id = new Guid("fd6032c5-7592-42cb-b16e-c25633043a24"),
                Name = "Green Macaron",
                ImageUrl = "images/macarons/green.png",
                Price = 2.50m,
                Type = ProductType.Individually,
                CreatedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5269),
                ModifiedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5269),
                IsDeleted = false
            }
        );
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