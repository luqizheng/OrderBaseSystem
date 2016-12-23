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

            services.AddSingleton(typeof(IQuotationPublisher), ps => ps.GetService<WebSocketPublisher>());
            services.AddSingleton(typeof(WebSocketPublisher));
            services.AddSingleton(typeof(QuotationStatusPublisher));
            return builder;
        }

        public static IApplicationBuilder UseWebSocketQuote(this IApplicationBuilder app,
            string url = "/quote")

        {
            app.UseOrnamentWebSocket(setting =>
            {
                var handler = setting.AddText(url);
                var websocket = app.ApplicationServices.GetService<WebSocketPublisher>();
                websocket.Handler = handler;
            });
            return app;
        }

        public static IApplicationBuilder UseWebSocketQuotationStaus(this IApplicationBuilder app,
            string url = "/quote/status")

        {
            app.UseOrnamentWebSocket(setting =>
            {
                var handler = setting.AddText(url);
                var websocket = app.ApplicationServices.GetService<QuotationStatusPublisher>();
                websocket.Handler = handler;
            });
            return app;
        }
    }
}