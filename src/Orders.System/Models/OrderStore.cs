using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Orders.Stores;

namespace Order.System.Models
{
    public class OrderStore:IOrderStore
    {
        public void Insert(Orders.Order order)
        {
            throw new NotImplementedException();
        }

        public Orders.Order GetLastOrder(string user, int symbol)
        {
            throw new NotImplementedException();
        }

        public Orders.Order GetLastOrder(string user)
        {
            throw new NotImplementedException();
        }

        public Orders.Order GetLastOrder()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Orders.Order> GetUncloseOrders(DateTime closeTime)
        {
            throw new NotImplementedException();
        }
    }
}
