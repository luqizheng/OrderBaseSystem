using System.Collections.Generic;
using Orders.Policy;

namespace Orders.Stores.LiteDB
{
    public class OrderPolicyStore : IOrderPolicyStore {
        public IEnumerable<IOrderPolicy> GetOpenOrderPolicies(string user)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<IOrderPolicy> GetCloseOrderPolicies(string user)
        {
            throw new System.NotImplementedException();
        }
    }
}