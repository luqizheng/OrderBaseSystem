using System;
using Orders.Quotations;

namespace Orders
{
    public class Order
    {
        /// <summary>
        /// </summary>
        public Order()
        {
            CreateTime = DateTime.Now;
            Status = OrderStatus.Created;
        }

        /// <summary>
        /// </summary>
        /// <param name="amount"></param>
        /// <param name="direction"></param>
        public Order(decimal amount, Direction direction) : this()
        {
            if (Amount <= 0)
                throw new ArgumentOutOfRangeException(nameof(amount), "should be greater than 0");

            Amount = amount;
            Direction = direction;
        }

        public virtual decimal WinRate { get; set; } = 0.5m;

        /// <summary>
        /// 收到报价请求的时间。
        /// </summary>
        public virtual DateTime CreateTime { get; set; }

        /// <summary>
        /// 确认报价的时间
        /// </summary>
        public virtual DateTime? ConfirmDateTime { get; set; }

        /// <summary>
        /// </summary>
        public virtual Direction Direction { get; set; }

        /// <summary>
        ///     执行关闭订单的时间。
        /// </summary>
        public virtual DateTime ExecuteCloseTime { get; set; }

        /// <summary>
        /// </summary>
        public virtual DateTime? CompleteTime { get; set; }

        /// <summary>
        /// </summary>
        public virtual decimal Amount { get; set; }

        /// <summary>
        /// </summary>
        public virtual string Id { get; set; }

        /// <summary>
        /// </summary>
        public virtual string User { get; set; }

        /// <summary>
        /// </summary>
        public virtual OrderStatus Status { get; private set; }

        /// <summary>
        /// </summary>
        public virtual Symbol Symbol { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Quotation OpenPrice { get; private set; }
        /// <summary>
        /// 
        /// </summary>
        public decimal? Profit { get; private set; }
        /// <summary>
        /// 
        /// </summary>
        public Quotation ClosePrice { get; private set; }

        /// <summary>
        /// </summary>
        /// <param name="openPrice"></param>
        public void Confirm(Quotation openPrice)
        {
            if (openPrice == null)
                throw new ArgumentNullException(nameof(openPrice));
            ConfirmDateTime = DateTime.Now;
            OpenPrice = openPrice;
            Status = OrderStatus.Opening;
        }

        public void Close(Quotation closePrice)
        {
            if (closePrice == null)
                throw new ArgumentNullException(nameof(closePrice));
            CompleteTime = DateTime.Now;
            ClosePrice = closePrice;

            this.Status = OrderStatus.Completed;

            if (closePrice == OpenPrice)
            {
                Profit = 0;
            }
            else if (closePrice.Bid > OpenPrice.Bid)
            {
                Profit = Direction == Direction.Down ? -Amount : Amount * WinRate;
            }
            else
            {
                Profit = Direction == Direction.Up ? -Amount : Amount * WinRate;
            }
        }
    }
}