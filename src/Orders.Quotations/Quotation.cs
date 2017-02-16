using System;

namespace Orders.Quotations
{
    public class Quotation
    {
        private decimal? _ask;
        private decimal _bid;

        private int _spread;

        protected Quotation()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="symbolModel"></param>
        /// <param name="provierServerTickTime">Unix Time Tick= local time</param>
        public Quotation(Symbol symbolModel,
            long provierServerTickTime
        ) : this(symbolModel, provierServerTickTime, DateTime.Now)
        {
        }

        /// <param name="provierServerTickTime">Unix Time Tick= local time</param>
        public Quotation(Symbol symbolModel,
            long provierServerTickTime, DateTime arrivedTime
        )
        {
            Symbol = symbolModel;

            ProviderTime = DateTimeOffset.FromUnixTimeSeconds(provierServerTickTime);
            ArrivedTime = new DateTimeOffset(arrivedTime);
        }

        /// <summary>
        ///     报价服务器的报价时间
        /// </summary>
        public DateTimeOffset ProviderTime { get; }

        /// <summary>
        ///     报价来源
        /// </summary>
        public string Channel { get; set; }

        /// <summary>
        ///     点差
        /// </summary>
        public int Spread
        {
            get { return _spread; }
            set        {
                _spread = value;
                _ask = null;
            }
        }

        /// <summary>
        ///     报价到达时间
        /// </summary>
        public DateTimeOffset ArrivedTime { get; }

        public Symbol Symbol { get; set; }

        /// <summary>
        ///     卖价、市价
        /// </summary>
        public decimal Bid
        {
            get { return _bid; }
            set {
                _bid = value;
                _ask = null;
            }
        }

        /// <summary>
        ///     原始价格
        /// </summary>
        public decimal SrcBid { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>    
        public bool Adjusted { get; set; }

        public string BidWithFormat
        {
            get
            {
                var point = "#,0." + "".PadRight(Symbol.Scale, '0');
                return Bid.ToString(point);
            }
        }

        /// <summary>
        ///     买价
        /// </summary>
        public decimal Ask
        {
            get
            {
                if (_ask == null)
                {
                    var fu = (int) Math.Pow(10, Symbol.Scale);
                    var bidInt = Bid*fu;
                    _ask = (bidInt + Spread)/Convert.ToDecimal(fu);
                }

                return _ask.Value;
            }
        }

        /// <summary>
        ///     变动方向
        /// </summary>
        public Direction Direction { get; set; }

        public string ToClient(bool useArrivedTime = false)
        {
            var bid = Convert.ToInt32(Bid*(int) Math.Pow(10, Symbol.Scale)).ToString();


            var basicInfoPart = string.Format("{0},{1},{2}",
                Symbol.Id,
                bid,
                (int) Direction
            );

            return string.Format("{0}|{1}",
                useArrivedTime ? ArrivedTime.ToUnixTimeSeconds() : ProviderTime.ToUnixTimeSeconds(), basicInfoPart);
        }
    }
}