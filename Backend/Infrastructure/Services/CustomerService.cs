using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IDbContextFactory<OMAContext> _contextFactory;

        public CustomerService(IDbContextFactory<OMAContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }


        public IQueryable<Customer> GetCustomersAndOrders()
        {
            var context = _contextFactory.CreateDbContext();

            return context.Customers
                .Include(c => c.Orders)
                .Include(c => c.Address)
                .Where(c => !c.IsDeleted);
            
        }
        public async Task<Customer> AddOrUpdateCustomerAsync(CustomerModel customerModel)
        {
            var context = _contextFactory.CreateDbContext();
            
            Customer customer = new Customer();

            if (!customerModel.Id.HasValue)
            {
                customer.FirstName = customerModel.FirstName;
                customer.LastName = customerModel.LastName;
                customer.ContactNumber = customerModel.ContactNumber;
                customer.Email = customerModel.Email;
                customer.Address = new Address
                {
                    AddressLine1 = customerModel.AddressLine1,
                    AddressLine2 = customerModel.AddressLine2,
                    City = customerModel.City,
                    State = customerModel.State,
                    Country = customerModel.Country
                };
                await context.Customers.AddAsync(customer);
            }
            else
            {
                customer = await context.Customers
                    .Include(c => c.Address)
                    .FirstOrDefaultAsync(c => c.Id == customerModel.Id)
                    ?? throw new Exception("Customer not found");

                if (customer == null)
                {
                    throw new Exception("Customer not found");
                }
                
                customer.FirstName = customerModel.FirstName;
                customer.LastName = customerModel.LastName;
                customer.ContactNumber = customerModel.ContactNumber;
                customer.Email = customerModel.Email;

                if (customer.Address == null)
                {
                    customer.Address = new Address();
                }
                customer.Address.AddressLine1 = customerModel.AddressLine1;
                customer.Address.AddressLine2 = customerModel.AddressLine2;
                customer.Address.City = customerModel.City;
                customer.Address.State = customerModel.State;
                customer.Address.Country = customerModel.Country;

                context.Customers.Update(customer);
            }

            await context.SaveChangesAsync();
            return customer;
        }
    }
}