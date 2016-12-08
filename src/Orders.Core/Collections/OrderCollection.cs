using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Orders.Collections
{
    public class OrderCollection
    {
        private readonly IDictionary<string, Order> _pool = new ConcurrentDictionary<string, Order>();

        public decimal TotalAmount { get; private set; }

        public int Count => _pool.Count;

        public void Add(Order order)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));
            if (string.IsNullOrEmpty(order.Id))
                throw new ArgumentOutOfRangeException(nameof(order), "Order's Id should not be empty or null.");

            _pool.Add(order.Id, order);
            TotalAmount += order.Volume;
        }

        public void Remove(Order order)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));
            if (string.IsNullOrEmpty(order.Id))
                throw new ArgumentOutOfRangeException(nameof(order), "Order's Id should not be empty or null.");


            _pool.Remove(order.Id);
            TotalAmount -= order.Volume;
        }
    }
}