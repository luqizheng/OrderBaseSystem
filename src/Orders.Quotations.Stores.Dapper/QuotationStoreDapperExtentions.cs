using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Orders.Quotations.Stores;

namespace Orders.Quotations
{
    public static class QuotationStoreDapperExtentions
    {
        public static QuotationServiceBuilder AddQuotationDapperStore(this QuotationServiceBuilder builder)
        {
            var services = builder.Services;
            services.AddScoped(typeof(ISymbolStore), typeof(SymbolStore));
            services.AddScoped(typeof(IChartInfoStore), typeof(ChartInfoStore));
            return builder;
        }
    }
}
