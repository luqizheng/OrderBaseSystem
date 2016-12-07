using Orders.Collections;
using Orders.Stores;

namespace Orders
{
    public class OrderContext
    {
        public OrderContext()
        {
            UncloseOrders = new UncloseOrderQueue();
            Statistics = new UserSymbolOrderCollection();
        }

      

        public UncloseOrderQueue UncloseOrders { get; }

        public UserSymbolOrderCollection Statistics { get; }
    }
}