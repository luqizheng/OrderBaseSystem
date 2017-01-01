using System;
using System.Collections.Concurrent;

namespace Orders.Collections
{
    /// <summary>
    ///     基于用户统计的集合
    /// </summary>
    public class UserSymbolOrderCollection
    {
        private readonly ConcurrentDictionary<string, SymbolOrderCollection>
            _userOrderRelative = new ConcurrentDictionary<string, SymbolOrderCollection>();

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public int GetOrderCount(string user)
        {
            SymbolOrderCollection collection;
            if (!_userOrderRelative.TryGetValue(user, out collection))
                return 0;
            return collection.Count;
        }

        /// <summary>
        /// </summary>
        /// <param name="symbolId"></param>
        /// <param name="user"></param>
        /// <param name="amount"></param>
        /// <param name="orderCount"></param>
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

        /// <summary>
        /// </summary>
        /// <param name="symbolId"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Order GetLastOrder(int symbolId, string user)
        {
            SymbolOrderCollection collection;
            if (!_userOrderRelative.TryGetValue(user, out collection))
                return null;

            return collection.GetLastOrder(symbolId);
        }

        /// <summary>
        /// </summary>
        /// <param name="order"></param>
        public void Add(Order order)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));

            var collection = _userOrderRelative.GetOrAdd(order.User,
                user => new SymbolOrderCollection());

            collection.Add(order);
        }

        /// <summary>
        /// </summary>
        /// <param name="order"></param>
        public void Remove(Order order)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));

            SymbolOrderCollection collection;
            if (_userOrderRelative.TryGetValue(order.User, out collection))
                collection.Remove(order);
        }
    }
}