using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Ornament.WebSockets;

namespace Orders.Quotations.Publishers
{
    public static class QuotationWebSocketExtentations
    {
        public static IServiceCollection AddQuotationWebSocket(
            this IServiceCollection services)


        {
            services.AddOrnamentWebSocket();

            return services;
        }

        public static IApplicationBuilder UseWebSocketQuote(this IApplicationBuilder app, string url = "/quote")
        {
            var quotationProvider = app.ApplicationServices.GetService<QuotationProvider>();
            app.UseOrnamentWebSocket(setting =>
            {
                var handler = setting.AddText(url);
                //handler.OnConnecting = (socket, http, manager) =>
                //{
                //    app.ApplicationServices.GetRequiredService<IChartInfoStore>().List();
                //};

                handler.OnReceived = (socket, context, text, manager) =>
                {
                    if (text == "start")
                        quotationProvider.Received += (sender, args) =>
                        {
                            socket.SendTextAsnyc(args.ToClient());
                        };
                };
            });
            return app;
        }
    }
}