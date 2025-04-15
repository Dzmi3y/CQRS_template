using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CT.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDateUtc", "DefaultAddress", "DefaultPhoneNumber", "Email", "IsDeleted", "ModifiedBy", "ModifiedDateUtc", "Name", "PasswordHash" },
                values: new object[] { new Guid("07f1348e-5b4c-4f21-a38a-9c7d493cf625"), "DbContextInitializer", new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc), "", "", "test@test.com", false, "DbContextInitializer", new DateTime(2025, 4, 15, 9, 43, 28, 725, DateTimeKind.Utc), "Test", "AQAAAAEAACcQAAAAEK3lyWfqNrzQ0P109198vqCfSb4EdhlF2EprWMW9aXYsQnEp4tx3vnYQLZGuebYClg==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("07f1348e-5b4c-4f21-a38a-9c7d493cf625"));
        }
    }
}
