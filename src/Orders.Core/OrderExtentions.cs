using System;
using Microsoft.Extensions.DependencyInjection;
using Orders.Notify;

namespace Orders
{
    public static class OrderExtentions
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="services"></param>
        /// <param name="enableCloseService">启动这个配置之后，要确保订单会发送到其他地方进行平仓</param>
        /// <returns></returns>
        public static OrderServiceBuilder
            AddOrderService(this IServiceCollection services, bool enableCloseService)
        {
            services.AddSingleton<OrderContext>();
            services.AddScoped(typeof(OrderService));
            services.AddSingleton(typeof(UncloseOrderWatcher));
            services.AddSingleton(sp =>
            {
                var notifies = sp.GetServices<IOrderNotify>();
                return new OrderNotifyManager(notifies);
            });

            var result = new OrderServiceBuilder(services, true, enableCloseService);

            services.AddSingleton(result);
            return result;
        }

        public static IServiceProvider UseOrderService(this IServiceProvider provider)
        {
            provider.GetService<UncloseOrderWatcher>().Start();
            return provider;
        }
    }
}