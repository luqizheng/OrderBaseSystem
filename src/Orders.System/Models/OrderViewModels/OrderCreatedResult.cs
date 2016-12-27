using System;

// ReSharper disable once CheckNamespace
namespace Orders
{
    public class OrderCreatedResult
    {
        private DateTime _expireDateTime;
        public string Id { get; set; }
        public decimal OpenPrice { get; set; }

        public DateTime ExpireDateTime
        {
            get { return _expireDateTime; }
            set { _expireDateTime = new DateTime(value.Year, value.Month, value.Day, value.Hour, value.Minute, value.Second); }
        }
    }
}