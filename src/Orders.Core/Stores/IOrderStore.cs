using System;
using System.Collections.Generic;

namespace Orders.Stores
{
    public interface IOrderStore
    {
        void Insert(Order order);

        void Update(Order order);

        Order GetLastOrder(string user, int symbol);

        Order GetLastOrder(string user);

        Order GetLastOrder();
        IEnumerable<Order> GetUncloseOrders(DateTime closeTime);
    }
}