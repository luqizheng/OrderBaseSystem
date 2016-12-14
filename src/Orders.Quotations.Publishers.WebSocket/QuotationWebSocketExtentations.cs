using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Orders.Quotations.Publishers;
using Ornament.WebSockets;

namespace Orders.Quotations
{
    public static class QuotationWebSocketExtentations
    {
        public static QuotationServiceBuilder AddWebSocketPublisher(
            this QuotationServiceBuilder builder)
        {
            var services = builder.Services;
            services.AddOrnamentWebSocket();
            services.AddSingleton(typeof(IQuotationPublisher), typeof(WebSocketPublisher));
            return builder;
        }

        public static IApplicationBuilder UseWebSocketQuote(this IApplicationBuilder app,
            string url = "/quote")

        {


            app.UseOrnamentWebSocket(setting => { setting.AddText(url); });
            return app;
        }
    }
}