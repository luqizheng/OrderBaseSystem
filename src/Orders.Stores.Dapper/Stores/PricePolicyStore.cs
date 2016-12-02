using System.Collections.Generic;
using Orders.Policy;

namespace Orders.Stores
{
    public class PricePolicyStore : IPricePolicyStore
    {
        public IEnumerable<IOpenPricePolicy> GetOpenPricePolicies(string user)
        {
            return new List<IOpenPricePolicy>();
        }

        public IEnumerable<IClosePricePolicy> GetClosePricePolicies(string user)
        {
            return new List<IClosePricePolicy>();
        }
    }
}