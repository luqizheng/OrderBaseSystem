using System;
using Orders.Games;
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
        /// <param name="volume"></param>
        /// <param name="direction"></param>
        public Order(decimal volume, Direction direction) : this()
        {
            if (Volume <= 0)
                throw new ArgumentOutOfRangeException(nameof(volume), "should be greater than 0");

            Volume = volume;
            Direction = direction;
        }


        /// <summary>
        ///     收到报价请求的时间。
        /// </summary>
        public virtual DateTime CreateTime { get; set; }

        /// <summary>
        ///     确认报价的时间
        /// </summary>
        public virtual DateTime? ConfirmDateTime { get; set; }

        /// <summary>
        /// </summary>
        public virtual Direction Direction { get; set; }


        /// <summary>
        ///     订单执行完成的时间,并不是close-order时间
        /// </summary>
        public virtual DateTime? CompleteTime { get; set; }


        /// <summary>
        /// </summary>
        public virtual decimal Volume { get; set; }

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
        public virtual Game Game { get; set; }


        /// <summary>
        /// </summary>
        public decimal? Profit { get; private set; }

        /// <summary>
        /// </summary>
        public CloseOrderInformation CloseInfo { get; } = new CloseOrderInformation();

        /// <summary>
        /// </summary>
        public OpenOrderInformation OpenInfo { get; } = new OpenOrderInformation();

        /// <summary>
        /// </summary>
        /// <param name="openPrice"></param>
        public void Open(Quotation openPrice)
        {
            if (openPrice == null)
                throw new ArgumentNullException(nameof(openPrice));

            ConfirmDateTime = DateTime.Now;
            OpenInfo.OpenPrice = openPrice;
            CompleteTime = Game.GetCloseTime(openPrice.ArrivedTime);
            Status = OrderStatus.Opening;
        }

        public void Close(Quotation closePrice)
        {
            if (closePrice == null)
                throw new ArgumentNullException(nameof(closePrice));

            CloseInfo.ClosePrice = closePrice;
            CompleteTime = DateTime.Now;
            Status = OrderStatus.Completed;

            if (closePrice == OpenInfo.OpenPrice)
                Profit = 0;
            else if (closePrice.Bid > OpenInfo.OpenPrice.Bid)
                Profit = Direction == Direction.Down ? -Volume : Volume*Game.Rate;
            else
                Profit = Direction == Direction.Up ? -Volume : Volume*Game.Rate;
        }

        public class OpenOrderInformation
        {
            public Quotation OpenPrice { get; set; }

            public DateTime? ClientPostTime { get; set; }
        }

        public class CloseOrderInformation
        {
            public Quotation ClosePrice { get; internal set; }

            /// <summary>
            ///     到期
            /// </summary>
            public DateTime ExpireDateTime { get; internal set; }
        }
    }
}