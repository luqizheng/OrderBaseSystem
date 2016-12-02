using System;
using System.Data.SqlClient;
using Microsoft.Extensions.DependencyInjection;
using Orders.Stores;
using Ornament.Uow;

namespace Orders
{
    public static class OrderStoreDapperImpleExtentations
    {
        public static OrderServiceBuilder AddOrderStoreDapper(this OrderServiceBuilder orderServiceBuilder,
            string connectionstring)
        {
            if (connectionstring == null) throw new ArgumentNullException(nameof(connectionstring));
            var services = orderServiceBuilder.Services;
            services.AddScoped(typeof(IOrderPolicyStore), typeof(OrderPolicyStore));
            services.AddScoped(typeof(IPricePolicyStore), typeof(PricePolicyStore));
            services.AddScoped(typeof(IGameStore), typeof(GameStore));
            services.AddScoped(typeof(IOrderStore), typeof(OrderStore));

            services.AddSingleton(typeof(IOrderIdGenerator), typeof(OrderIdGenerator));
            services.AddDbUow(() =>
            {
                var conn = new SqlConnection(connectionstring);
                return new OrderUow(conn);
            }, true);

            return orderServiceBuilder;
        }
    }
}