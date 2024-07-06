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
    public class OrderService : IOrderService
    {
        private readonly IDbContextFactory<OMAContext> _contextFactory;

        public OrderService(IDbContextFactory<OMAContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<Order> AddOrUpdateOrderAsync(OrderModel orderModel)
        {
            var context = _contextFactory.CreateDbContext();

            Order order = new Order();

            var customer = await context.Customers.FirstOrDefaultAsync(c => c.Id == orderModel.CustomerId)
                          ?? throw new Exception("Customer not found");

            if (!orderModel.Id.HasValue)
            {
                order.CustomerId = orderModel.CustomerId;
                order.OrderDate = orderModel.OrderDate;
                order.DepositAmount = orderModel.DepositAmount;
                order.TotalAmount = orderModel.TotalAmount;
                order.Description = orderModel.Description;
                order.IsDelivery = orderModel.IsDelivery;
                order.Status = orderModel.Status;
                order.OtherNotes = orderModel.OtherNotes;

                await context.Orders.AddAsync(order);
            }
            else
            {
                order = await context.Orders
                    .Include(o => o.Customer)
                    .FirstOrDefaultAsync(o => o.Id == orderModel.Id)
                    ?? throw new Exception("Order not found");

                order.CustomerId = orderModel.CustomerId;
                order.OrderDate = orderModel.OrderDate;
                order.DepositAmount = orderModel.DepositAmount;
                order.TotalAmount = orderModel.TotalAmount;
                order.Description = orderModel.Description;
                order.IsDelivery = orderModel.IsDelivery;
                order.Status = orderModel.Status;
                order.OtherNotes = orderModel.OtherNotes;

                context.Orders.Update(order);
            }

            await context.SaveChangesAsync();
            return order;
        }

        public async Task<bool> DeleteAsync(int orderId)
        {
            var context = _contextFactory.CreateDbContext();
            var order = await context.Orders.FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
            {
                throw new Exception("Order not found");
            }

            if (!order.IsDeleted)
            {
                order.IsDeleted = true;
                context.Orders.Update(order);
                return await context.SaveChangesAsync() > 0;
            }

            return false;
        }

        public IQueryable<Order> GetOrders()
        {
            var context = _contextFactory.CreateDbContext();
            return context.Orders.Include(o => o.Customer).Where(o => !o.IsDeleted);
        }
    }
}