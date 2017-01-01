using System;
using System.Collections.Generic;
using Orders.Policy;

namespace Orders.Stores
{
    public class Policy : IOrderPolicyStore
    {
        public IEnumerable<IOrderPolicy> GetOpenOrderPolicies(string user)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<IOrderPolicy> GetCloseOrderPolicies(string user)
        {
            throw new NotImplementedException();
        }
    }
}