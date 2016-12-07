using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Orders.Quotations;
using Orders.Quotations.Stores;
using Orders.Stores;

namespace Orders
{
    public static class OrderExtentions
    {
        public static IServiceCollection AddOrderService<TOrderStore, TSymbolStore>(this IServiceCollection services)
            where TOrderStore : IOrderStore
            where TSymbolStore : ISymbolStore
        {
            services.AddSingleton(new QuotationContext());
            services.AddSingleton(new OrderContext());
            services.AddScoped(typeof(IOrderStore), typeof(TOrderStore));
            services.AddScoped(typeof(ISymbolStore), typeof(TSymbolStore));
            return services;
        }
    }
}
