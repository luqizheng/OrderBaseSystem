using System;
using Microsoft.Extensions.DependencyInjection;

namespace Orders.Quotations.RedisProvider
{
    public static class RedisQuotationProviderExtentions
    {
        public static IServiceCollection AddRedistQuotation(this IServiceCollection services)
        {
            services.AddSingleton<RedisQuotatiohProviderBuilder>();


            return services;
        }

        /// <summary>
        ///     使用Redist 报价服务，并且返回改报价实例
        /// </summary>
        /// <param name="app"></param>
        /// <param name="setting"></param>
        /// <returns></returns>
        public static QuotationProvider UseRedistQuotationService(this IServiceProvider app,
            Action<RedisQuotatiohProviderBuilder> setting)
        {
            var redist = app.GetService<RedisQuotatiohProviderBuilder>();

            setting(redist);
            redist.Build();

            var provider = app.GetService<RedisQuotationProvider>();
            provider.Start();
            return provider;
        }
    }
}