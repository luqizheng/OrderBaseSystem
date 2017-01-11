namespace Orders
{
    public class OrderIdGenerator : IOrderIdGenerator
    {
        private readonly object _lockItem = new object();


        private int _currentId;

        public OrderIdGenerator(int currentId)
        {
            _currentId = currentId;
        }

        public string CurrentId => _currentId.ToString();


        public string Next()
        {
            lock (_lockItem)
            {
                _currentId++;
                return _currentId.ToString();
            }
        }
    }
}