using CT.Domain.Entities;
using CT.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace CT.Infrastructure.Persistence;

public static class InitHelper
{
    public static void InitUser(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasData(new List<User>
        {
            new()
            {
                Id = new Guid("07f1348e-5b4c-4f21-a38a-9c7d493cf625"),
                Email = "test@test.com",
                PasswordHash =
                    "AQAAAAEAACcQAAAAEK3lyWfqNrzQ0P109198vqCfSb4EdhlF2EprWMW9aXYsQnEp4tx3vnYQLZGuebYClg==", // 1qaz@WSX
                Name = "Test",
                CreatedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc),
                ModifiedDateUtc = new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc),
                CreatedBy = "DbContextInitializer",
                ModifiedBy = "DbContextInitializer"
            }
        });
    }

    public static void InitProducts(ModelBuilder modelBuilder)
    {
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
}