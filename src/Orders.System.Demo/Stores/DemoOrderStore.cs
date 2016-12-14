using System;
using System.Collections.Generic;
using Orders.Stores;

namespace Orders.System.Demo.Stores
{
    public class DemoOrderStore : IOrderStore
    {
        public void Insert(Order order)
        {
            throw new NotImplementedException();
        }

        public void Update(Order order)
        {
            throw new NotImplementedException();
        }

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

        public IEnumerable<Order> GetUncloseOrders(DateTime closeTime)
        {
            throw new NotImplementedException();
        }
    }
}