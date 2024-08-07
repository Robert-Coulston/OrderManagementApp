using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Models;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        IQueryable<Order> GetOrders();

        Task<Order> AddOrUpdateOrderAsync(OrderModel orderModel);
        Task<bool> DeleteAsync(int orderId);
    }
}