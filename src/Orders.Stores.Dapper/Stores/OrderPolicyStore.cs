using System.Collections.Generic;
using Orders.Policy;

namespace Orders.Stores
{
    public class OrderPolicyStore : IOrderPolicyStore
    {
        public IEnumerable<IOrderPolicy> GetOpenOrderPolicies(string user)
        {
            return new List<IOrderPolicy>();
        }

        public IEnumerable<IOrderPolicy> GetCloseOrderPolicies(string user)
        {
            return new List<IOrderPolicy>();
        }
    }
}