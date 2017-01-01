using System.Collections.Concurrent;
using Newtonsoft.Json;
using Ornament.Domain.Entities;
using Ornament.WebSockets;
using Ornament.WebSockets.Collections;
using Ornament.WebSockets.Handlers;

namespace Orders.Notify
{
    /// <summary>
    /// 
    /// </summary>
    public class UserWebSocketContainer : AbstractWebSocketDictionary<string>
    {
        internal WebSocketHandler Handler { get; set; }
        ConcurrentDictionary<string, string> _socketIdUserMap = new ConcurrentDictionary<string, string>();
        public void Add(OrnamentWebSocket socket, string user)
        {
            this.AddIn(socket, user);
            _socketIdUserMap.TryAdd(socket.Id, user);
        }

        public void Remove(OrnamentWebSocket socket)
        {
            string user;
            if (_socketIdUserMap.TryGetValue(socket.Id, out user))
                base.Remove(socket, user);
        }
    }

    public static class SendingHelper
    {
        public static void SendTo<T>(this WebSocketHandler heandler, string group, T objOfNotify)
        {
            WebSocketCollection userSocketCollection;

            if (heandler.Groups.TryGetGroup(group, out userSocketCollection))
            {
                var s = JsonConvert.SerializeObject(objOfNotify);
                foreach (var socketId in userSocketCollection.GetClients())
                    socketId.SendTextAsnyc(s);
            }
        }

        public static void SendTo<T>(this UserWebSocketContainer userContainer, string user, T objectNotify)
        {
            WebSocketCollection userSocketCollection;

            if (userContainer.TryGetGroup(user, out userSocketCollection))
            {
                var s = JsonConvert.SerializeObject(objectNotify);
                foreach (var socketId in userSocketCollection.GetClients())
                    socketId.SendTextAsnyc(s);
            }
        }
    }
}