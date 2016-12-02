using System;
using System.Collections.Generic;
using LiteDB;

namespace Orders.Stores.LiteDB
{
    public class OrderStores : IOrderStore, IDisposable
    {
        private const string DbOrder = "orders";
        private readonly LiteDatabase _db;

        public OrderStores(string storeFile)
        {
            _db = new LiteDatabase(storeFile);
        }

        public void Dispose()
        {
            _db.Dispose();
        }

        public void Update(Order order)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));
            var collection = _db.GetCollection<Order>(DbOrder);
            collection.Insert(order);
        }

        public void Insert(Order order)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));
            var collection = _db.GetCollection<Order>(DbOrder);
            collection.Insert(order);
        }

        public Order GetLastOrder(string user, int symbol)
        {
            throw new NotImplementedException();
        }

        public Order GetLastOrder(string user)
        {
            throw new NotImplementedException();
        }

        public Order GetLastOrder()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Order> GetUncloseOrders(DateTime closeTime)
        {
            throw new NotImplementedException();
        }
    }
}