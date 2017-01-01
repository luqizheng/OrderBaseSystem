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
            services.AddSingleton(typeof(IOrderNotify),
                sp => new WebSocketOrderNotify(sp.GetService<UserWebSocketContainer>()));
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
                var userContainer = app.ApplicationServices.GetService<UserWebSocketContainer>();
                userContainer.Handler = handler;

                handler.OnConnecting = (socket, http, manager) =>
                {
                    if (!http.User.Identity.IsAuthenticated)
                        throw new IllegeAccessException();
                    var isAdmin = funcIsAdmin(http);
                    handler.Groups
                        .Add(socket,
                            isAdmin ? WebSocketOrderNotify.AdminGroup : WebSocketOrderNotify.DefaultGroup);


                    userContainer.Add(socket, http.User.Identity.Name);
                };

                handler.OnClosed = (socket, http, manager) =>
                {
                    if (http.User.Identity.IsAuthenticated)
                    {
                        userContainer.Remove(socket);
                        handler.Groups.Remove(socket);
                    }
                };
            });
            return app;
        }
    }
}