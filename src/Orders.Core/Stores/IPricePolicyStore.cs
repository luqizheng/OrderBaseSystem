using System.Collections.Generic;
using Orders.Policy;

namespace Orders.Stores
{
    public interface IPricePolicyStore
    {
        IEnumerable<IOpenPricePolicy> GetOpenPricePolicies(string user);
        IEnumerable<IClosePricePolicy> GetClosePricePolicies(string user);
    }
}