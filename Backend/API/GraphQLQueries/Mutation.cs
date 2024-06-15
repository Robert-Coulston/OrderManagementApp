using System;
using Core.Entities;
using Core.Interfaces;
using Core.Models;

namespace OrderManagementApp.API.GraphQLQueries
{
    public class Mutation
    {
        public async Task<Customer> AddOrUpdateCustomer([Service] ICustomerService customerService, CustomerModel customerModel)
        {
            return await customerService.AddOrUpdateCustomerAsync(customerModel);

        }

        public async Task<Order> AddOrUpdateOrder([Service] IOrderService orderService, OrderModel orderModel)
        {
            return await orderService.AddOrUpdateOrderAsync(orderModel);

        }
    }
}