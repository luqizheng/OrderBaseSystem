using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Orders.Collections;
using Ornament.Collecions.Concurrent;

namespace Orders.Stores
{
    public class UncloseOrderQueue : IEnumerable<Order>
    {
        private readonly ILogger _logger;
        private readonly ConcurrentPriorityQueue<Order> _pools;

        public UncloseOrderQueue(ILogger logger) : this()
        {
            if (logger == null) throw new ArgumentNullException(nameof(logger));
            _logger = logger;
        }

        public UncloseOrderQueue()
        {
            Statistics = new UserSymbolOrderCollection();
            _pools = new ConcurrentPriorityQueue<Order>(900, new OrderCompare());
        }

        public UserSymbolOrderCollection Statistics { get; }

        public IEnumerator<Order> GetEnumerator()
        {
            return _pools.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }


        public void Add(Order order)
        {
            if (order.Status == OrderStatus.Opening)
            {
                _pools.Enqueue(order);
                Statistics.Add(order);
                _logger?.LogDebug("add new Order for test.");
                return;
            }

            throw new OrderCreatingException("不能加入非opening状态的订单");
        }

        public IEnumerable<Order> DequeueUncloseOrders(DateTime closeDateTime)
        {
            var result = new List<Order>();
            Order order;

            while (_pools.TryPeek(out order))
                if (order.CloseTime < closeDateTime)
                {
                    if (_pools.TryTake(out order))
                        if (order.CloseTime < closeDateTime)
                        {
                            result.Add(order);
                            Statistics.Remove(order);
                        }
                        else
                        {
                            _pools.TryAdd(order);
                        }
                }
                else
                    break;
            return result;
        }

        private class OrderCompare : IComparer<Order>
        {
            public int Compare(Order x, Order y)
            {
                return y.CloseTime.CompareTo(x.CloseTime);
            }
        }
    }
}