using System.Collections.Concurrent;
using Newtonsoft.Json;
using Ornament.WebSockets;

namespace Orders.Notify
{
    public class UserWebSocketContainer
    {
        private readonly ConcurrentDictionary<string, UserSokcetCollection> _pools =
            new ConcurrentDictionary<string, UserSokcetCollection>();

        private readonly ConcurrentDictionary<string, string> _socketGroupMapping =
            new ConcurrentDictionary<string, string>();

        private readonly ConcurrentDictionary<string, string> _userGroupMapping =
            new ConcurrentDictionary<string, string>();

        public void Add(string account, string websocketId, string group = "default")
        {
            var socketCollection = _pools.GetOrAdd(group, groupName => new UserSokcetCollection());
            socketCollection.Add(account, websocketId);
            _userGroupMapping.AddOrUpdate(account, act => group, (act1, exitAct2) => group);
            _socketGroupMapping.AddOrUpdate(websocketId, act => group, (act1, exitAct2) => group);
        }

        public string[] GetWeboSocketId(string user)
        {
            var groupName = "";
            if (_userGroupMapping.TryGetValue(user, out groupName))
            {
                UserSokcetCollection collection = null;
                if (_pools.TryGetValue(groupName, out collection))
                    return collection.GetWeboSocketId(user);
            }
            return new string[0];
        }

        public void Remove(string socketId)
        {
            var groupName = "";
            if (_socketGroupMapping.TryGetValue(socketId, out groupName))
            {
                UserSokcetCollection collection = null;
                if (_pools.TryGetValue(groupName, out collection))
                    collection.Remove(socketId);
            }
        }

        public void SendTo<T>(string group, T objOfNotify, WebSocketManager manager)
        {
            UserSokcetCollection userSocketCollection;
            if (_pools.TryGetValue(group, out userSocketCollection))
            {
                var s = JsonConvert.SerializeObject(objOfNotify);
                foreach (var socketId in userSocketCollection.GetSockets())
                    manager.Get(socketId).SendTextAsnyc(s);
            }
        }
    }
}