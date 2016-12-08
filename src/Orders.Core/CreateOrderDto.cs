using System;
using Orders.Games;
using Orders.Quotations;

namespace Orders
{
    public class OrderCreateDto
    {
        /// <summary>
        /// </summary>
        public string User { get; set; }

        /// <summary>
        /// </summary>
        public int SymbolId { get; set; }

        /// <summary>
        /// </summary>
        public decimal Amount { get; set; }

        /// <summary>
        /// </summary>
        public Direction Direction { get; set; }

        /// <summary>
        ///     到达服务器时间
        /// </summary>
        public DateTime ArriveDateTime { get; set; }

        /// <summary>
        ///     客户端提交时间。
        /// </summary>
        public DateTime ClientPostTime { get; set; }

        public int GameTypeId { get; set; }
    }
}