using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Models;

namespace Core.Interfaces
{
    public interface ICustomerService
    {
        IQueryable<Customer> GetCustomersAndOrders();
        Task<Customer> AddOrUpdateCustomerAsync(CustomerModel customerModel);
    }
}