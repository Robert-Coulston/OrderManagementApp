using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class BobTheBuilder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "ContactNumber", "Email", "FirstName", "IsDeleted", "LastName" },
                values: new object[] { 3, "2222222222", "bob@email.com", "Bob", false, "Builder" });

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                column: "OrderDate",
                value: new DateTime(2024, 6, 10, 11, 53, 7, 82, DateTimeKind.Local).AddTicks(7554));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 2,
                column: "OrderDate",
                value: new DateTime(2024, 6, 10, 11, 53, 7, 82, DateTimeKind.Local).AddTicks(7636));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 3,
                column: "OrderDate",
                value: new DateTime(2024, 6, 10, 11, 53, 7, 82, DateTimeKind.Local).AddTicks(7639));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 4,
                column: "OrderDate",
                value: new DateTime(2024, 6, 10, 11, 53, 7, 82, DateTimeKind.Local).AddTicks(7642));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 5,
                column: "OrderDate",
                value: new DateTime(2024, 6, 10, 11, 53, 7, 82, DateTimeKind.Local).AddTicks(7645));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: 3);

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

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 5,
                column: "OrderDate",
                value: new DateTime(2024, 6, 10, 11, 9, 26, 598, DateTimeKind.Local).AddTicks(7385));

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "CustomerId", "DepositAmount", "Description", "IsDeleted", "IsDelivery", "OrderDate", "OtherNotes", "Status", "TotalAmount" },
                values: new object[] { 6, 2, 88m, "order 222", false, true, new DateTime(2024, 6, 10, 11, 9, 26, 598, DateTimeKind.Local).AddTicks(7388), null, 3, 200m });
        }
    }
}
