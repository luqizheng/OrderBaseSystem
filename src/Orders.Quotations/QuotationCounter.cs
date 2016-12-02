using System;

namespace Orders.Quotations
{
    internal class QuotationCounter
    {
        public QuotationCounter(Quotation quotation)
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