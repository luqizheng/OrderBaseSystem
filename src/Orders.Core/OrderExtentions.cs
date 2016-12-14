using System;
using Microsoft.Extensions.DependencyInjection;
using Orders.Quotations;

namespace Orders
{
    public static class OrderExtentions
    {
        public static IServiceCollection AddOrderService(this IServiceCollection services)
        {
          
            services.AddSingleton(new OrderContext());
            services.AddScoped(typeof(OpenOrderService));
            services.AddSingleton(typeof(CloseOrderService));

            return (services);
        }

        public static IServiceProvider UseCloseOrderService(this IServiceProvider provider)
        {
            provider.GetService<CloseOrderService>().Start();
            return provider;
        }
    }
}