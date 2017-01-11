using System;
using System.Collections.Generic;
using System.Linq;
using Orders.Stores;
using Ornament.Domain.Stores;
using Ornament.Domain.Uow;

namespace Orders.System.Demo.Stores
{
    public class DemoOrderStore : IOrderStore
    {
        public Order GetLastOrder(string user, int symbol)
        {
            throw new NotImplementedException();
        }

        public Order GetLastOrder(string user)
        {
            throw new NotImplementedException();
        }

        public Order GetLastOrder()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Order> GetUncloseOrders(string user)
        {
            throw new NotImplementedException();
        }

        public int? GetLastOrderId(IOrderIdGenerator idGenerator)
        {
            throw new NotImplementedException();
        }

        public void Close(Order order)
        {
            throw new NotImplementedException();
        }

        public int? GetLastOrderId(string serverName)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public void Add(Order t)
        {
            throw new NotImplementedException();
        }

        public void Update(Order t)
        {
            throw new NotImplementedException();
        }

        public void Delete(Order t)
        {
            throw new NotImplementedException();
        }

        public Order Get(int id)
        {
            throw new NotImplementedException();
        }

   

        public IQueryable<Order> Entities { get; }

        public IEnumerable<Order> GetUncloseOrders(DateTime closeTime)
        {
            throw new NotImplementedException();
        }

        public int GetLastOrderId()
        {
            throw new NotImplementedException();
        }

        public IUnitOfWork Uow { get; }
    }
}