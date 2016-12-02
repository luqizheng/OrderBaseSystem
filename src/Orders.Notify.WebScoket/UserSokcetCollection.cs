using System.Collections.Generic;
using System.Linq;

namespace Orders.Notify
{
    public class UserSokcetCollection
    {
        private readonly Dictionary<string, IList<string>> accountWebSocketIdMapping =
            new Dictionary<string, IList<string>>();

        private readonly Dictionary<string, string> socketIdUserMapping = new Dictionary<string, string>();

        public void Add(string account, string websocketId)
        {
            lock (accountWebSocketIdMapping)
            {
                IList<string> webSocketIdList;
                if (!accountWebSocketIdMapping.ContainsKey(account))
                    accountWebSocketIdMapping.Add(account, webSocketIdList = new List<string>());
                else
                    webSocketIdList = accountWebSocketIdMapping[account];
                webSocketIdList.Add(websocketId);
                socketIdUserMapping.Add(websocketId, account);
            }
        }

        public void Remove(string websocketId)
        {
            var user = socketIdUserMapping[websocketId];
            socketIdUserMapping.Remove(websocketId);
            accountWebSocketIdMapping[user].Remove(websocketId);
        }

        public string[] GetWeboSocketId(string user)
        {
            return accountWebSocketIdMapping.ContainsKey(user)
                ? accountWebSocketIdMapping[user].ToArray()
                : new string[0];
        }

        public IEnumerable<string> GetSockets()
        {
            return socketIdUserMapping.Keys.ToArray();
        }
    }
}