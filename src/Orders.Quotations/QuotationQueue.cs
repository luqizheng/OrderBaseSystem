using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Orders.Quotations
{
    public class QuotationQueue : IEnumerable<Quotation>
    {
        private readonly ConcurrentQueue<Counter> _counters;
        private readonly ConcurrentQueue<Quotation> _list;

        public QuotationQueue(string symbol)
        {
            if (symbol == null) throw new ArgumentNullException(nameof(symbol));
            Symbol = symbol;
            _list = new ConcurrentQueue<Quotation>();
            _counters = new ConcurrentQueue<Counter>();
        }

        public string Symbol { get; private set; }


        public IEnumerator<Quotation> GetEnumerator()
        {
            return _list.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return _list.GetEnumerator();
        }

        public void Add(Quotation quotation)
        {
            if (quotation == null)
                throw new ArgumentNullException(nameof(quotation));
            _list.Enqueue(quotation);
            //计算次数
            foreach (var counter in _counters)
            {
                if (counter.ProviderTime == quotation.ProviderTime)
                {
                    //如果相同,那么次数增加
                    counter.Set(quotation);
                    break;
                }
                if (counter.ProviderTime > quotation.ProviderTime)
                {
                    _counters.Enqueue(new Counter(quotation));
                    break;
                }
            }
        }

        public void Remove(int expireSeconds)
        {
            Quotation result;
            while (_list.TryPeek(out result))
            {
                var remindSeconds = (DateTimeOffset.Now - result.ProviderTime).TotalSeconds;
                if (remindSeconds > expireSeconds)
                    _list.TryDequeue(out result);
                else
                    break;
            }
        }

        public Quotation First()
        {
            Quotation result;
            if (_list.TryPeek(out result))
                return result;
            return null;
        }

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
                if (counter.ProviderTime > endUnixTime)
                    continue;

                if (counter.ProviderTime < startTime)
                    break;
                digits = counter.Digits;
                hight = Math.Max(counter.Hight, hight);
                low = Math.Min(counter.Low, low);
                fenquence += counter.Count;
            }

            if (digits != 0)
            {
                var remind = (hight - low) * (decimal)Math.Pow(10, digits);
                amplitude = Convert.ToInt32(remind);
            }
        }

        private class Counter
        {
            public Counter(Quotation quotation)
            {
                ProviderTime = quotation.ProviderTime;
                Count = 0;
                Hight = quotation.Ask;
                Low = quotation.Bid;
                Digits = quotation.Symbol.Scale;
            }

            public int Digits { get; private set; }
            public decimal Hight { get; private set; }
            public decimal Low { get; private set; }
            public DateTimeOffset ProviderTime { get; }

            public int Count { get; private set; }

            public void Set(Quotation quotation)
            {
                Hight = Math.Max(quotation.Ask, Hight);
                Low = Math.Max(quotation.Bid, Low);
                Count++;
                if ((Digits != quotation.Symbol.Scale) && (quotation.Symbol.Scale > 0))
                    Digits = quotation.Symbol.Scale;
            }
        }
    }
}