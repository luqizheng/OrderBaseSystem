using System;
using System.Collections.Concurrent;
using System.Linq;

namespace Orders.Collections
{
    internal class SymbolOrderCollection
    {
        private readonly ConcurrentDictionary<int, Order>
            _lastOrderMap = new ConcurrentDictionary<int, Order>();

        private readonly ConcurrentDictionary<int, OrderCollection>
            _userOrderRelative = new ConcurrentDictionary<int, OrderCollection>();

        public int Count
        {
            get { return _userOrderRelative.Values.Sum(f => f.Count); }
        }


        public void Add(Order order)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));
            var collection =
                _userOrderRelative.GetOrAdd(order.Symbol.Id, symbolId => new OrderCollection());

            collection.Add(order);
            _lastOrderMap.AddOrUpdate(order.Symbol.Id, symbolId => order, (symbolId, existOrder) => order);
        }

        public void Remove(Order order)
        {
            OrderCollection collection;
            if (_userOrderRelative.TryGetValue(order.Symbol.Id, out collection))
            {
                collection.Remove(order);
                _lastOrderMap.TryRemove(order.Symbol.Id, out order);
            }
        }

        public void OrderCount(int symbolId, out decimal amount, out int orderCount)
        {
            amount = 0;
            orderCount = 0;
            OrderCollection collection;
            if (!_userOrderRelative.TryGetValue(symbolId, out collection))
                return;
            amount = collection.TotalAmount;
            orderCount = collection.Count;
        }

        public Order GetLastOrder(int symbolId)
        {
            Order lastOrder;
            if (!_lastOrderMap.TryGetValue(symbolId, out lastOrder))
                return null;
            return lastOrder;
        }
    }
}