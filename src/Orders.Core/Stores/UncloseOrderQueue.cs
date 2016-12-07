using System;
using System.Collections.Generic;
using Orders.Collections;
using Ornament.Collecions.Concurrent;

namespace Orders.Stores
{
    public class UncloseOrderQueue
    {
        private readonly ConcurrentPriorityQueue<Order> _pools;

        public UncloseOrderQueue()
        {
            Statistics = new UserSymbolOrderCollection();
            _pools = new ConcurrentPriorityQueue<Order>(900, new OrderCompare());
        }

        public UserSymbolOrderCollection Statistics { get; }


        public void Add(Order order)
        {
            if (order.Status == OrderStatus.Opening)
            {
                _pools.Enqueue(order);
                Statistics.Add(order);
                return;
            }

            throw new OrderCreatingException("不能加入非opening状态的订单");
        }

        public IEnumerable<Order> DequeueUncloseOrders(DateTime closeDateTime)
        {
            var result = new List<Order>();
            Order order;

            while (_pools.TryPeek(out order))
            {
                if (order.ExecuteCloseTime < closeDateTime)
                {
                    if (_pools.TryTake(out order))
                    {
                        if (order.ExecuteCloseTime < closeDateTime)
                        {
                            result.Add(order);
                            Statistics.Remove(order);
                        }
                        else
                        {
                            _pools.TryAdd(order);
                        }
                    }
                }
                else
                    break;
            }
            return result;
        }

        private class OrderCompare : IComparer<Order>
        {
            public int Compare(Order x, Order y)
            {
                return x.ExecuteCloseTime.CompareTo(y.ExecuteCloseTime);
            }
        }
    }
}