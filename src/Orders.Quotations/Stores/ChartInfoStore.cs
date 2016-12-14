using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Orders.Quotations.Stores
{
    public interface IChartInfoStore
    {
        IEnumerable<ChartInfo> List(ChartInfoType type, Symbol symbol, DateTime? start, DateTime? end);

    }
}
