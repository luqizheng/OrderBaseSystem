using System.Collections.Generic;
using Orders.Policy;
using Orders.Quotations;

namespace Orders.Stores.LiteDB
{
    public class PricePolicyStore : IPricePolicyStore
    {
        public IEnumerable<IOpenPricePolicy> GetOpenPricePolicies(string user)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<IClosePricePolicy> GetClosePricePolicies(string user)
        {
            throw new System.NotImplementedException();
        }
    }
}