using System;
using Microsoft.Extensions.DependencyInjection;
using Orders.Quotations.Providers;
using Orders.Quotations.Stores;

namespace Orders.Quotations.RedisProvider
{
    public static class RedisQuotationProviderExtentions
    {
        public static QuotationServiceBuilder AddRedstiQuotationProvider
            (this QuotationServiceBuilder quotationServiceBuilder, Action<RedistQuotationProviderSetting> settingFunc)
        {
            var services = quotationServiceBuilder.Services;
            services.AddSingleton<RedistQuotationProviderSetting>();

            var redistSetting = new RedistQuotationProviderSetting();
            settingFunc(redistSetting);
            services.AddSingleton(redistSetting);

            services.AddSingleton(p =>
            {
                var store = p.GetRequiredService<ISymbolStore>();
                var builder = p.GetRequiredService<RedistQuotationProviderSetting>();
                return (QuotationProvider)new RedisQuotationProvider(store, builder);
            });

            return quotationServiceBuilder;
        }
    }
}