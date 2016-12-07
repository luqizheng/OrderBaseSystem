using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

namespace Orders.Quotations.Stores
{
    public interface ISymbolStore
    {
        IEnumerable<Symbol> Symbols { get; }



    }
}
