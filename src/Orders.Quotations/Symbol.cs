using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using Ornament;

namespace Orders.Quotations
{
    public class Symbol
    {
        private IDictionary<DayOfWeek, IList<TimePeriod>> _tradingSession;
        public int Id { get; set; }
        public string Name { get; set; }

        public string Code { get; set; }
        public int Scale { get; set; }

        public IDictionary<DayOfWeek, IList<TimePeriod>> TradingSession
            => _tradingSession ?? (_tradingSession = new ConcurrentDictionary<DayOfWeek, IList<TimePeriod>>());


    }
}