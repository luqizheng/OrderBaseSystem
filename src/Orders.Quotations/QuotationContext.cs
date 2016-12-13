using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace Orders.Quotations
{
    /// <summary>
    ///     内存级别的报价缓冲，将会代替有Redist存储的报价方式。
    ///     计划是通过QuoteProvider获取报价，然后存储到这个内存式的QuotationManager里面。
    /// </summary>
    public class QuotationContext : IDisposable
    {
        //public static readonly QuotationContext Instance = new QuotationContext();
        public static int ExpireSeconds = 60;

        private readonly ConcurrentDictionary<int, QuotationQueue> _list =
            new ConcurrentDictionary<int, QuotationQueue>();

        private readonly Timer _timer;

        public QuotationContext()
        {
            _timer = new Timer(s =>
            {
                foreach (var keys in _list.Keys)
                {
                    var queue = _list[keys];
                    ClearExpire(queue);
                }
            }, null, 1000, 1000);
        }

        public void Dispose()
        {
            _timer.Dispose();
        }

        public void Add(Quotation quotation)
        {
            if (quotation == null) throw new ArgumentNullException(nameof(quotation));
            QuotationQueue queue;
            if (!_list.ContainsKey(quotation.Symbol.Id))
            {
                //开辟的内存为 512个，根据过往经验，1分钟约有最大有900个报价。约每秒15个。
                queue = new QuotationQueue(quotation.Symbol.Code);
                if (!_list.TryAdd(quotation.Symbol.Id, queue))
                    queue = _list[quotation.Symbol.Id];
            }
            else
            {
                queue = _list[quotation.Symbol.Id];
            }
            var previous = Get(quotation.Symbol.Id);
            if (previous != null)
                quotation.Direction = previous.Bid > quotation.Bid ? Direction.Down : Direction.Up;
            queue.Add(quotation);
        }

        /// <summary>
        ///     获取当前报价
        /// </summary>
        /// <param name="symbolId"></param>
        /// <returns></returns>
        public Quotation Get(int symbolId)
        {
            QuotationQueue queue;
            if (_list.TryGetValue(symbolId, out queue))
                return queue.First();
            return null;
        }


        private void ClearExpire(QuotationQueue queue)
        {
            queue.Remove(ExpireSeconds);
        }

        /// <summary>
        ///     获取报价，header是最新报价
        /// </summary>
        /// <param name="symbolId"></param>
        /// <returns></returns>
        public IEnumerable<Quotation> GetList(int symbolId)
        {
            QuotationQueue queue;
            if (_list.TryGetValue(symbolId, out queue))
                return queue;
            return new Quotation[0];
        }

        /// <summary>
        /// </summary>
        /// <param name="symbolId"></param>
        /// <param name="startTime"></param>
        /// <param name="offsetSeconds"></param>
        /// <returns></returns>
        public IEnumerable<Quotation> GetQuotation(int symbolId, DateTime startTime, int offsetSeconds)
        {
            var endTime = startTime.AddSeconds(offsetSeconds);
            return GetQuotation(symbolId, startTime, endTime);
        }

        public Quotation[] GetQuotation(int symbolId, DateTime startTime, DateTime endTime)
        {
            startTime = startTime.AddMilliseconds(-startTime.Millisecond);
            endTime = startTime.AddMilliseconds(999 - endTime.Millisecond);

            var quotation = from quote in GetList(symbolId)
                            where (quote.ArrivedTime >= startTime)
                                  && (quote.ArrivedTime <= endTime)
                            select quote;
            return quotation.ToArray();
        }

        /// <summary>
        /// 获取一秒内的报价。 
        /// </summary>
        /// <param name="symbolId"></param>
        /// <param name="datetime">获取时间点</param>
        /// <param name="datetimeInSeconds">是否精确到毫秒</param>
        /// <returns></returns>
        public Quotation[] GetQuotationsInSecond(int symbolId, DateTime datetime, bool datetimeInSeconds = true)
        {
            var start = datetimeInSeconds ? new DateTime(datetime.Year, datetime.Month,
                datetime.Day, datetime.Hour, datetime.Minute,
                datetime.Second)
                : datetime;
            var end = start.AddSeconds(1);
            var list = new List<Quotation>();

            foreach (var quotation in GetList(symbolId))
            {
                if (quotation.ArrivedTime > end)
                    continue;
                if ((quotation.ArrivedTime < start) && (list.Count > 0))
                    break;
                list.Add(quotation);
            }

            return list.ToArray();
        }
    }
}