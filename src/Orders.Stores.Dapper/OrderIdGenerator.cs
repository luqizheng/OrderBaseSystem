using Orders.Stores;

namespace Orders
{
    public class OrderIdGenerator : IOrderIdGenerator
    {
        private readonly object lockItem = new object();
        private int _currentId;

        public OrderIdGenerator(IOrderStore store)
        {
            _currentId = store.GetLastOrderId(this) ?? 0;
        }

        public string CurrentId => _currentId.ToString();

        public string Next()
        {
            lock (lockItem)
            {
                _currentId++;
                return _currentId.ToString();
            }
        }
    }
}