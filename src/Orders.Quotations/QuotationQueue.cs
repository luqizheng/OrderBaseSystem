using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace Orders.Quotations
{
    public class QuotationQueue : IEnumerable<Quotation>
    {
        private readonly ConcurrentQueue<QuotationCounter> _counters;
        private readonly ReaderWriterLockSlim _lastQuotationLockSlim = new ReaderWriterLockSlim();

        private readonly ConcurrentQueue<Quotation> _list;
        private Quotation _lastQuotation;

        public QuotationQueue()
        {
            _list = new ConcurrentQueue<Quotation>();
            _counters = new ConcurrentQueue<QuotationCounter>();
        }

        public Quotation CurrentQuotation
        {
            get
            {
                _lastQuotationLockSlim.EnterReadLock();
                try
                {
                    return _lastQuotation;
                }
                finally
                {
                    _lastQuotationLockSlim.ExitReadLock();
                }
            }
        }

        public IEnumerator<Quotation> GetEnumerator()
        {
            return _list.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return _list.GetEnumerator();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="datetime"></param>
        /// <returns>输入时间没有匹配任何报价返回null</returns>
      
        public Quotation GetQuotation(DateTime datetime)
        {
            if (!_list.Any())
                return null;

            var miniTime = _list.First().ArrivedTime;

            var maxTime = CurrentQuotation.ArrivedTime;

            if (datetime < miniTime)
                return null;
            if (datetime > maxTime)
                return CurrentQuotation;
            Quotation result = null;
            foreach (var quotation in _list.Reverse())
            {
                if (quotation.ArrivedTime > datetime)
                    continue;
                if (quotation.ArrivedTime < datetime)
                {
                    if (result == null)
                        result = quotation;
                    break;
                }
                result = quotation;
            }

            return result;
        }

        public void Add(Quotation quotation)
        {
            if (quotation == null)
                throw new ArgumentNullException(nameof(quotation));
            _list.Enqueue(quotation);

            _lastQuotationLockSlim.EnterWriteLock();
            _lastQuotation = quotation;
            _lastQuotationLockSlim.ExitWriteLock();

            var counter = _counters.LastOrDefault();
            if (counter != null)
                if (counter.ProviderTime == quotation.ProviderTime)
                {
                    //如果相同,那么次数增加
                    counter.Set(quotation);
                    return;
                }
            _counters.Enqueue(new QuotationCounter(quotation));
        }


        public Quotation[] GetQuotationsByMaxEndTime(DateTime startTime,
            int? offsetMillionsSeconds = null)
        {
            var endTime = offsetMillionsSeconds != null
                ? startTime.AddMilliseconds(offsetMillionsSeconds.Value)
                : startTime.AddMilliseconds(999 - startTime.Millisecond);

            var miniTime = _list.First().ArrivedTime;
            var maxTime = _list.Last().ArrivedTime;

            if ((endTime < miniTime) || (endTime > maxTime))
                return null;
            var result = new List<Quotation>();
            Quotation startQuotation = null;
            foreach (var quotation in _list)
            {
                if (quotation.ArrivedTime > endTime)
                    return result.ToArray();
                startQuotation = quotation;

                if (startQuotation.ArrivedTime >= startTime)
                    result.Add(startQuotation);
            }
            if (!result.Any())
                result.Add(startQuotation);
            return result.ToArray();
        }

        public void Remove(int expireSeconds)
        {
            Quotation result;
            while (_list.TryPeek(out result))
            {
                var remindSeconds = (DateTimeOffset.Now - result.ArrivedTime).TotalSeconds;
                if (remindSeconds > expireSeconds)
                    _list.TryDequeue(out result);
                else
                    break;
            }
            QuotationCounter counter;
            while (_counters.TryPeek(out counter))
            {
                var remindSeconds = (DateTimeOffset.Now - counter.ProviderTime).TotalSeconds;
                if (remindSeconds > expireSeconds)
                    _counters.TryDequeue(out counter);
                else
                    break;
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="startTime"></param>
        /// <param name="endUnixTime"></param>
        /// <param name="fenquence">报价频率</param>
        /// <param name="amplitude">幅度</param>
        public void Overview(DateTimeOffset startTime, DateTimeOffset endUnixTime,
            out int fenquence, out int amplitude)
        {
            decimal hight = 0;
            decimal low = int.MaxValue;

            fenquence = 0;
            var digits = 0;
            amplitude = 0;
            foreach (var counter in _counters)
            {
                if ((counter.ProviderTime > endUnixTime) || (counter.ProviderTime < startTime))
                    continue;
                digits = counter.Digits;
                hight = Math.Max(counter.Hight, hight);
                low = Math.Min(counter.Low, low);
                fenquence += counter.Count;
            }
            var remind = hight - low;
            if (digits != 0)
                remind = remind*(decimal) Math.Pow(10, digits);
            amplitude = Convert.ToInt32(remind);
        }
    }
}