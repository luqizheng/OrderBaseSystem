using System.Collections.Generic;
using Orders.Policy;

namespace Orders.Stores
{
    public interface IOrderPolicyStore
    {
        IEnumerable<IOrderPolicy> GetOpenOrderPolicies(string user);
        IEnumerable<IOrderPolicy> GetCloseOrderPolicies(string user);
    }
}