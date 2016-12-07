using System.Collections.Generic;
using Orders.Quotations;

namespace Orders
{
    public static class QuotationExtender
    {
        public static Quotation Max(this IEnumerable<Quotation> selectors)
        {
            Quotation quotation = null;
            foreach (var q in selectors)
            {
                if (quotation == null)
                {
                    quotation = q;
                    continue;
                }

                if (q.Bid > quotation.Bid)
                    quotation = q;
            }
            return quotation;
        }

        public static Quotation Min(this IEnumerable<Quotation> selectors)
        {
            Quotation quotation = null;
            foreach (var q in selectors)
            {
                if (quotation == null)
                {
                    quotation = q;
                    continue;
                }

                if (q.Bid < quotation.Bid)
                    quotation = q;
            }
            return quotation;
        }
    }
}