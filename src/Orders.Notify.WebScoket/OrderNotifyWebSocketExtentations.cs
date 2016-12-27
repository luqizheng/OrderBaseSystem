using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Orders.Notify.WebSockets;
using Ornament.WebSockets;

namespace Orders.Notify
{
    public static class OrderNotifyWebSocketExtentations
    {
        /// <summary>
        /// </summary>
        /// <param name="builder"></param>
        /// <returns></returns>
        public static OrderServiceBuilder AddOrderNotify(this OrderServiceBuilder builder)
        {
            var services = builder.Services;
            services.AddScoped<UserWebSocketContainer>();
            services.AddSingleton(typeof(IOrderNotify), typeof(WebSocketOrderNotify));
            return builder;
        }

        /// <summary>
        /// </summary>
        /// <param name="app"></param>
        /// <param name="url"></param>
        /// <param name="funcIsAdmin"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseWebSocketForOrderNotify(this IApplicationBuilder app,
            Func<HttpContext, bool> funcIsAdmin, string url = "notify/order")
        {
            app.UseOrnamentWebSocket(setting =>
            {
                var handler = setting.AddText(url);
                handler.OnConnecting = (socket, http, manager) =>
                {
                    var isAdmin = funcIsAdmin(http);
                    app.ApplicationServices.GetService<UserWebSocketContainer>()
                        .Add(socket,
                        isAdmin ? WebSocketOrderNotify.AdminGroup : WebSocketOrderNotify.DefaultGroup);
                };

                handler.OnClosed = (socket, http, manager) =>
                {
                    app.ApplicationServices.GetService<UserWebSocketContainer>()
                        .Remove(socket);
                };
            });
            return app;
        }
    }
}