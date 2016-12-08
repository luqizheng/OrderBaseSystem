using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Orders.Quotation.Stores.LiteDB;
using Orders.Quotations.Stores;

namespace Orders.Quotation
{
    public static class OrdersQuotationExtents
    {
        public static IServiceCollection AddDbLiteStore(this IServiceCollection services)
        {
            services.AddScoped(typeof(ISymbolStore), typeof(SymbolStore));
            return services;
        }
    }
}
