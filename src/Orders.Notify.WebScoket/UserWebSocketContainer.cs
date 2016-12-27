using Newtonsoft.Json;
using Ornament.WebSockets.Collections;

namespace Orders.Notify
{
    public class UserWebSocketContainer : GroupWebSocketCollection
    {
        public void SendTo<T>(string group, T objOfNotify)
        {
            WebSocketCollection<string> userSocketCollection;

            if (TryGetGroup(group, out userSocketCollection))
            {
                var s = JsonConvert.SerializeObject(objOfNotify);
                foreach (var socketId in userSocketCollection.GetClients())
                    socketId.SendTextAsnyc(s);
            }
        }
    }
}