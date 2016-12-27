using System;
using System.Collections.Generic;
using System.Linq;

namespace Orders.Notify
{
    public class UserSokcetCollection
    {
        private readonly Dictionary<string, IList<string>> _accountWebSocketIdMapping =
            new Dictionary<string, IList<string>>();

        private readonly Dictionary<string, string> _socketIdUserMapping = new Dictionary<string, string>();

        public void Add(string account, string websocketId)
        {
            lock (_accountWebSocketIdMapping)
            {
                IList<string> webSocketIdList;
                if (!_accountWebSocketIdMapping.ContainsKey(account))
                    _accountWebSocketIdMapping.Add(account, webSocketIdList = new List<string>());
                else
                    webSocketIdList = _accountWebSocketIdMapping[account];
                webSocketIdList.Add(websocketId);
                _socketIdUserMapping.Add(websocketId, account);
            }
        }

        public void Remove(string websocketId)
        {
            if (websocketId == null) throw new ArgumentNullException(nameof(websocketId));
            var user = _socketIdUserMapping[websocketId];
            _socketIdUserMapping.Remove(websocketId);
            _accountWebSocketIdMapping[user].Remove(websocketId);
        }

        public string[] GetWeboSocketId(string user)
        {
            return _accountWebSocketIdMapping.ContainsKey(user)
                ? _accountWebSocketIdMapping[user].ToArray()
                : new string[0];
        }

        public IEnumerable<string> GetSockets()
        {
            return _socketIdUserMapping.Keys.ToArray();
        }
    }
}