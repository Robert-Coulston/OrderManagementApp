using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddOrders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                column: "OrderDate",
                value: new DateTime(2024, 6, 10, 11, 9, 26, 598, DateTimeKind.Local).AddTicks(7323));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 2,
                column: "OrderDate",
                value: new DateTime(2024, 6, 10, 11, 9, 26, 598, DateTimeKind.Local).AddTicks(7376));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 3,
                column: "OrderDate",
                value: new DateTime(2024, 6, 10, 11, 9, 26, 598, DateTimeKind.Local).AddTicks(7379));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 4,
                column: "OrderDate",
                value: new DateTime(2024, 6, 10, 11, 9, 26, 598, DateTimeKind.Local).AddTicks(7382));

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "CustomerId", "DepositAmount", "Description", "IsDeleted", "IsDelivery", "OrderDate", "OtherNotes", "Status", "TotalAmount" },
                values: new object[,]
                {
                    { 5, 1, 88m, "order 111", false, true, new DateTime(2024, 6, 10, 11, 9, 26, 598, DateTimeKind.Local).AddTicks(7385), null, 0, 200m },
                    { 6, 2, 88m, "order 222", false, true, new DateTime(2024, 6, 10, 11, 9, 26, 598, DateTimeKind.Local).AddTicks(7388), null, 3, 200m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                column: "OrderDate",
                value: new DateTime(2024, 6, 10, 10, 54, 13, 374, DateTimeKind.Local).AddTicks(1087));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 2,
                column: "OrderDate",
                value: new DateTime(2024, 6, 10, 10, 54, 13, 374, DateTimeKind.Local).AddTicks(1263));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 3,
                column: "OrderDate",
                value: new DateTime(2024, 6, 10, 10, 54, 13, 374, DateTimeKind.Local).AddTicks(1266));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 4,
                column: "OrderDate",
                value: new DateTime(2024, 6, 10, 10, 54, 13, 374, DateTimeKind.Local).AddTicks(1269));
        }
    }
}
