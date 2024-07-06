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
        public async Task<bool> DeleteCustomer([Service] ICustomerService customerService, int customerId)
        {
            // Implement the DeleteAsync method in the ICustomerService interface.
            return await customerService.DeleteAsync(customerId);

        }

        public async Task<bool> DeleteOrder([Service] IOrderService orderService, int orderId)
        {
            // Implement the DeleteAsync method in the ICustomerService interface.
            return await orderService.DeleteAsync(orderId);

        }
    }
}