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

        public static IApplicationBuilder UseWebSocketForOrderNotify(this IApplicationBuilder app, string url,
            Func<HttpContext, bool> funcIsAdmin)
        {
            app.UseOrnamentWebSocket(setting =>
            {
                var handler = setting.AddText(url);
                handler.OnConnecting = (socket, http, manager) =>
                {
                    var isAdmin = funcIsAdmin(http);
                    app.ApplicationServices.GetService<UserWebSocketContainer>()
                        .Add(http.User.Identity.Name, socket.Id,
                            isAdmin ? WebSocketOrderNotify.AdminGroup : "default");
                };

                handler.OnClosed = (socket, http, manager) =>
                {
                    app.ApplicationServices.GetService<UserWebSocketContainer>()
                        .Remove(socket.Id);
                };

                //handler.OnReceived = (socket, context, arg3, arg4) => { };
            });
            return app;
        }

        //public static IApplicationBuilder UseWebSocketForOrderAdminNotify(this IApplicationBuilder app, string url)
        //{
        //    app.UseOrnamentWebSocket(setting =>
        //    {
        //        var handler = setting.AddText(url);

        //        handler.OnClosed = (socket, http, manager) =>
        //        {
        //            app.ApplicationServices.GetService<UserWebSocketContainer>()
        //                .Remove(socket.Id);
        //        };

        //        //handler.OnReceived = (socket, context, arg3, arg4) => { };
        //    });
        //    return app;
        //}
    }
}