using System;
using System.Collections.Generic;
using Ornament.Domain.Stores;

namespace Orders.Stores
{
    public interface IOrderStore:IStore<Order,int>
    {

        Order GetLastOrder(string user, int symbol);

        Order GetLastOrder(string user);

        Order GetLastOrder();
        IEnumerable<Order> GetUncloseOrders(string user);

        int? GetLastOrderId(IOrderIdGenerator idGenerator);
        void Close(Order order);
       
    }
}