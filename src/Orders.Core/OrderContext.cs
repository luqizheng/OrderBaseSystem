using System;
using Microsoft.Extensions.Logging;
using Orders.Collections;
using Orders.Stores;

namespace Orders
{
    public class OrderContext
    {
        private readonly ILogger<OrderContext> _logger;

        public OrderContext(ILogger<OrderContext> logger)
        {
            if (logger == null) throw new ArgumentNullException(nameof(logger));
            _logger = logger;
            UncloseOrders = new UncloseOrderQueue(logger);
        }

        public UncloseOrderQueue UncloseOrders { get; }

    


    }
}