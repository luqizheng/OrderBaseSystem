using System.Collections.Generic;

namespace Orders.Quotations.Stores
{
    public interface ISymbolStore
    {
        IEnumerable<Symbol> Symbols { get; }
    }
}