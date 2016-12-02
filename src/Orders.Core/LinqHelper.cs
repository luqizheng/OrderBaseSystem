using System.Collections.Generic;
using Orders.Quotations;

namespace Orders
{
    internal static class LinqHelper
    {
        public static Quotation Max(this IEnumerable<Quotation> selectors)
        {
            Quotation quotation = null;
            foreach (var q in selectors)
                if ((quotation == null) || (q.Bid > quotation.Bid))
                    quotation = q;
            return quotation;
        }

        public static Quotation Min(this IEnumerable<Quotation> selectors)
        {
            Quotation quotation = null;
            foreach (var q in selectors)
                if ((quotation == null) || (q.Bid < quotation.Bid))
                    quotation = q;
            return quotation;
        }
    }
}