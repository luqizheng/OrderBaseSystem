using System;
using System.Collections.Generic;
using System.Linq;

namespace Orders.Notify
{
    public class UserSokcetCollection
    {
        private readonly Dictionary<string, IList<string>> accountWebSocketIdMapping =
            new Dictionary<string, IList<string>>();

        private readonly Dictionary<string, string> _socketIdUserMapping = new Dictionary<string, string>();

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
                _socketIdUserMapping.Add(websocketId, account);
            }
        }

        public void Remove(string websocketId)
        {
            if (websocketId == null) throw new ArgumentNullException(nameof(websocketId));
            var user = _socketIdUserMapping[websocketId];
            _socketIdUserMapping.Remove(websocketId);
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
            return _socketIdUserMapping.Keys.ToArray();
        }
    }
}