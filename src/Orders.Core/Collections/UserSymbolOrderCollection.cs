using System;
using System.Collections.Concurrent;

namespace Orders.Collections
{
    public class UserSymbolOrderCollection
    {
        private readonly ConcurrentDictionary<string, SymbolOrderCollection>
            _userOrderRelative = new ConcurrentDictionary<string, SymbolOrderCollection>();


        public int GetOrderCount(string user)
        {
            SymbolOrderCollection collection;
            if (!_userOrderRelative.TryGetValue(user, out collection))
                return 0;
            return collection.Count;
        }
        public void OrderCount(int symbolId, string user, out decimal amount, out int orderCount)
        {
            amount = 0;
            orderCount = 0;
            SymbolOrderCollection collection;
            if (!_userOrderRelative.TryGetValue(user, out collection))
                return;

            collection.OrderCount(symbolId, out amount, out orderCount)
                ;
        }

        public Order GetLastOrder(int symbolId, string user)
        {
            SymbolOrderCollection collection;
            if (!_userOrderRelative.TryGetValue(user, out collection))
                return null;

            return collection.GetLastOrder(symbolId);
        }

        public void Add(Order order)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));
            var collection = _userOrderRelative.GetOrAdd(order.User,
                user => new SymbolOrderCollection());

            collection.Add(order);
        }

        public void Remove(Order order)
        {
            SymbolOrderCollection collection;
            if (_userOrderRelative.TryGetValue(order.User, out collection))
                collection.Remove(order);
        }
    }
}