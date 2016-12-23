using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
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
               
                queue = new QuotationQueue();
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
                return queue.GetQuotation(DateTime.Now);
            return null;
        }


        private void ClearExpire(QuotationQueue queue)
        {
            queue.Remove(ExpireSeconds);
        }

        /// <summary>
        ///     获取报价,第一个为最旧的报价。
        /// </summary>
        /// <param name="symbolId"></param>
        /// <returns></returns>
        public QuotationQueue GetList(int symbolId)
        {
            QuotationQueue queue;
            if (_list.TryGetValue(symbolId, out queue))
                return queue;
            return null;
        }
       
        /// <summary>
        ///     获取某个报价时间的唯一报价.这个是精确报价。
        /// </summary>
        /// <param name="symbolId"></param>
        /// <param name="datetime"></param>
        /// <param name="quotation"></param>
        /// <returns></returns>
        public bool TryGetQuotation(int symbolId, DateTime datetime, out Quotation quotation)
        {
            var quotationQueue = GetList(symbolId);
            if (quotationQueue == null)
                throw new ArgumentNullException(nameof(symbolId), "cannot find quotation of " + symbolId + " symbol ");
            quotation = quotationQueue.GetQuotation(datetime);
            return quotation != null;
        }

        /// <summary>
        ///     获取startTime到 start.999最好毫秒内所有报价。
        /// </summary>
        /// <param name="symbolId"></param>
        /// <param name="startTime"></param>
        /// <param name="offsetMillionsSeconds">往后扩大取值范围。如果为false，取值范围会限定这一秒内</param>
        /// <returns></returns>
        public Quotation[] GetQuotationsByMaxEndTime(int symbolId, DateTime startTime,
            int? offsetMillionsSeconds = null)
        {
            var queue = GetList(symbolId);
            if (queue == null)
                throw new ArgumentNullException(nameof(symbolId), "cannot find quotation of " + symbolId + " symbol ");
            return queue.GetQuotationsByMaxEndTime(startTime);
        }

        /// <summary>
        ///     获取一秒内的报价。
        /// </summary>
        /// <param name="symbolId"></param>
        /// <param name="datetime">获取时间点</param>
        /// <param name="datetimeInSeconds">把取报价范围扩大到dateTime一秒内</param>
        /// <returns></returns>
        public Quotation[] GetQuotationsInSecond(int symbolId, DateTime datetime, bool datetimeInSeconds)
        {
            var start = datetimeInSeconds
                ? new DateTime(datetime.Year, datetime.Month,
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