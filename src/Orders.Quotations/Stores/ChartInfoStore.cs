using System;
using System.Collections.Generic;

namespace Orders.Quotations.Stores
{
    public interface IChartInfoStore
    {
        IEnumerable<ChartInfo> List(ChartInfoType type, Symbol symbol, DateTime? start, DateTime? end);
    }
}