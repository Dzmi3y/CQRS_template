using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CT.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Productdataadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CreatedBy", "CreatedDateUtc", "ImageUrl", "IsDeleted", "ModifiedBy", "ModifiedDateUtc", "Name", "Price", "Type" },
                values: new object[,]
                {
                    { new Guid("054bc9a7-609e-417c-a08d-f3edcf66365f"), null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5277), "images/macarons/purple.png", false, null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5278), "Purple Macaron", 2.50m, "Individually" },
                    { new Guid("08f35a7b-f8e8-48f3-8596-60e157c072a3"), null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5282), "images/macarons/set2.png", false, null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5282), "Macaron set #2", 10.00m, "Individually" },
                    { new Guid("0ea0c77b-5389-418c-bc39-aa53c7faf1d0"), null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5295), "images/macarons/set6.png", false, null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5296), "Macaron set #6", 10.00m, "Individually" },
                    { new Guid("35eb441d-8162-46b8-a9e4-f467639b41c1"), null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(4986), "images/macarons/orange.png", false, null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5136), "Orange Macaron", 2.50m, "Individually" },
                    { new Guid("3e12e305-73fb-4476-a9a7-d70d7a8d1798"), null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5291), "images/macarons/set4.png", false, null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5291), "Macaron set #4", 10.00m, "Individually" },
                    { new Guid("6d7d7c4b-188c-4811-9e78-65eb0d24e00e"), null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5273), "images/macarons/red.png", false, null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5273), "Red Macaron", 2.50m, "Individually" },
                    { new Guid("78bcfa91-cf39-4553-804e-3b6fc30e092b"), null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5271), "images/macarons/pink.png", false, null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5271), "Pink Macaron", 2.50m, "Individually" },
                    { new Guid("9cc9b4f4-c5a6-4c05-b471-336bd8b96794"), null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5280), "images/macarons/set1.png", false, null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5280), "Macaron set #1", 10.00m, "Individually" },
                    { new Guid("9f0d7ccd-94c8-4efc-890c-0c870c1964c6"), null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5275), "images/macarons/dark.png", false, null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5276), "Dark Macaron", 2.50m, "Individually" },
                    { new Guid("e00af05d-272a-4c9e-9383-c6b1853e4e3d"), null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5293), "images/macarons/set5.png", false, null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5294), "Macaron set #5", 10.00m, "Individually" },
                    { new Guid("f2361fd0-134d-4a7c-b4a5-e7948e19c0d0"), null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5289), "images/macarons/set3.png", false, null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5289), "Macaron set #3", 10.00m, "Individually" },
                    { new Guid("fd6032c5-7592-42cb-b16e-c25633043a24"), null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5269), "images/macarons/green.png", false, null, new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc).AddTicks(5269), "Green Macaron", 2.50m, "Individually" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("054bc9a7-609e-417c-a08d-f3edcf66365f"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("08f35a7b-f8e8-48f3-8596-60e157c072a3"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("0ea0c77b-5389-418c-bc39-aa53c7faf1d0"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("35eb441d-8162-46b8-a9e4-f467639b41c1"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("3e12e305-73fb-4476-a9a7-d70d7a8d1798"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("6d7d7c4b-188c-4811-9e78-65eb0d24e00e"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("78bcfa91-cf39-4553-804e-3b6fc30e092b"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("9cc9b4f4-c5a6-4c05-b471-336bd8b96794"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("9f0d7ccd-94c8-4efc-890c-0c870c1964c6"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("e00af05d-272a-4c9e-9383-c6b1853e4e3d"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("f2361fd0-134d-4a7c-b4a5-e7948e19c0d0"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("fd6032c5-7592-42cb-b16e-c25633043a24"));
        }
    }
}
