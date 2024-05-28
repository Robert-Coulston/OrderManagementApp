using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Enums;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class OMAContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public OMAContext(DbContextOptions<OMAContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var address1 = new Address { Id = 1, CustomerId = 1, AddressLine1 = "123 Main St", City = "New York", State = "NY", Country = "USA" };
            var address2 = new Address { Id = 2, CustomerId = 2, AddressLine1 = "456 Main St", City = "Los Angeles", State = "CA", Country = "USA" };

            modelBuilder.Entity<Address>().HasData(
                address1,
                address2
            );

            var customer1 = new Customer { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@email.com", ContactNumber = "1234567890" };
            var customer2 = new Customer { Id = 2, FirstName = "Jane", LastName = "Doe", Email = "jane.doe@email.com", ContactNumber = "1111111111" };

            modelBuilder.Entity<Customer>().HasData(
                customer1,
                customer2
            );


            modelBuilder.Entity<Order>().HasData(
                new Order { Id = 1, CustomerId = 1, OrderDate = DateTime.Now, Description = "order 123", Status = Status.Pending, TotalAmount = 100, DepositAmount = 50, IsDelivery = true, IsDeleted = false },
                new Order { Id = 2, CustomerId = 2, OrderDate = DateTime.Now, Description = "order 456", Status = Status.Shipped, TotalAmount = 100, DepositAmount = 50, IsDelivery = true, IsDeleted = false },
                new Order { Id = 3, CustomerId = 1, OrderDate = DateTime.Now, Description = "order 321", Status = Status.Pending, TotalAmount = 200, DepositAmount = 99, IsDelivery = true, IsDeleted = false },
                new Order { Id = 4, CustomerId = 2, OrderDate = DateTime.Now, Description = "order 654", Status = Status.Shipped, TotalAmount = 200, DepositAmount = 99, IsDelivery = true, IsDeleted = false }
            );
        }

    }
}