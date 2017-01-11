using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Orders.Games;
using Orders.Quotations;

namespace Orders
{
    /// <summary>
    /// </summary>
    public class Order
    {
        /// <summary>
        /// </summary>
        protected Order()
        {
            CreateTime = DateTime.Now;
            Status = OrderStatus.Created;
        }

        /// <summary>
        /// </summary>
        /// <param name="volume"></param>
        /// <param name="direction"></param>
        /// <param name="user"></param>
        public Order(decimal volume, Direction direction, string user) : this()
        {
            if (volume <= 0)
                throw new ArgumentOutOfRangeException(nameof(volume), "should be greater than 0");

            Volume = volume;
            Direction = direction;
            User = user;
        }


        /// <summary>
        ///     收到报价请求的时间。
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        ///     确认报价的时间
        /// </summary>
        public virtual DateTime? ConfirmDateTime { get; set; }

        /// <summary>
        /// </summary>
        public Direction Direction { get; set; }


        /// <summary>
        ///     正常执行平仓的时间。
        /// </summary>
        public virtual DateTime CloseTime { get; private set; }


        /// <summary>
        /// </summary>
        public decimal Volume { get; set; }

        /// <summary>
        /// </summary>
        [Key]
        public virtual string Id { get; set; }

        /// <summary>
        /// </summary>
        public virtual string User { get; private set; }

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
        /// <param name="game"></param>
        public void Open(Quotation openPrice, Game game)
        {
            if (openPrice == null)
                throw new ArgumentNullException(nameof(openPrice));
            if (game == null)
                throw new ArgumentNullException(nameof(game));
            if (game.Symbol == null)
                throw new ArgumentException("Game can't be null.");
            Game = game;
            ConfirmDateTime = DateTime.Now;
            OpenInfo.Price = openPrice;
            CloseTime = Game.GetCloseTime(openPrice.ArrivedTime.DateTime);
            Status = OrderStatus.Opening;
        }

        /// <summary>
        /// </summary>
        /// <param name="closePrice"></param>
        public void Close(Quotation closePrice)
        {
            if (closePrice == null)
                throw new ArgumentNullException(nameof(closePrice));

            CloseInfo.Price = closePrice;
            CloseInfo.CompleteTime = DateTime.Now;
            Status = OrderStatus.Completed;

            if (closePrice == OpenInfo.Price)
                Profit = 0;
            else if (closePrice.Bid > OpenInfo.Price.Bid)
                Profit = Direction == Direction.Down ? -Volume : Volume * Game.Rate;
            else
                Profit = Direction == Direction.Up ? -Volume : Volume * Game.Rate;
        }

        /// <summary>
        /// </summary>
        [ComplexType]
        public class OpenOrderInformation
        {
            public Quotation Price { get; internal set; }

            public DateTime? ClientPostTime { get; internal set; }
        }

        /// <summary>
        /// </summary>
        [ComplexType]
        public class CloseOrderInformation
        {
            /// <summary>
            ///     价格信息
            /// </summary>
            public Quotation Price { get; internal set; }

            /// <summary>
            ///     执行平仓的时间。
            /// </summary>
            public DateTime CompleteTime { get; internal set; }
        }
    }
}