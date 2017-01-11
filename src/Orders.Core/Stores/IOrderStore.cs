using System.Collections.Generic;
using Ornament.Domain.Stores;

namespace Orders.Stores
{
    public interface IOrderStore
    {
        Order GetLastOrder(string user, int symbol);

        IEnumerable<Order> GetUncloseOrders(string user);

        void Close(Order order);

        int? GetLastOrderId(string serverName);

        void Add(Order order);
    }
}