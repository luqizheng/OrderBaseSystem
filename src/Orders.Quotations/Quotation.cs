using System;

namespace Orders.Quotations
{
    public class Quotation
    {
        private decimal? _ask;
        private decimal _bid;
        private DateTime? _provideTime;
        private int _spread;

        protected Quotation()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="symbolModel"></param>
        /// <param name="unixTimeTick">Unix Time Tick= local time</param>
        /// <param name="quotationServerTimeTick">报价的报文所带的报价时间</param>
        public Quotation(Symbol symbolModel,
            long unixTimeTick,
            long quotationServerTimeTick
        )
        {
            Symbol = symbolModel;
            ArrivedTime = DateTime.Now;
            UnixTimeTick = unixTimeTick;
            QuotationServerTimeTick = quotationServerTimeTick;
        }

        public Quotation(Symbol symbolModel,
            long unixTimeTick
        )
            : this(symbolModel, unixTimeTick, unixTimeTick)
        {
        }

        /// <summary>
        ///     报价服务过来的Tick
        /// </summary>
        public long UnixTimeTick { get; private set; }

        /// <summary>
        ///     报价的原始数据
        /// </summary>
        public long QuotationServerTimeTick { get; set; }

        /// <summary>
        ///     获取报价时间。已经转换为本地时间
        /// </summary>
        public DateTime ProviderTime
        {
            get
            {
                if (_provideTime == null)
                {
                    var offsetTime = DateTimeOffset.FromUnixTimeSeconds(QuotationServerTimeTick);
                    _provideTime = offsetTime.DateTime;
                }
                return _provideTime.Value;
            }
        }

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
            set
            {
                _spread = value;
                _ask = null;
            }
        }

        /// <summary>
        ///     报价到达时间
        /// </summary>
        public DateTime ArrivedTime { get; private set; }

        public Symbol Symbol { get; set; }

        /// <summary>
        ///     卖价、市价
        /// </summary>
        public decimal Bid
        {
            get { return _bid; }
            set
            {
                _bid = value;
                _ask = null;
            }
        }

        /// <summary>
        ///     原始价格
        /// </summary>
        public decimal SrcBid { get; set; }

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
    }
}