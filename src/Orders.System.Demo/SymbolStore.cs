using System.Collections.Generic;
using Orders.Quotations;
using Orders.Quotations.Stores;

namespace Orders.System.Demo
{
    public class SymbolStore : ISymbolStore
    {
        private readonly List<Symbol> symbols = new List<Symbol>
        {
            new Symbol
            {
                Code = "AUDCADbo",
                Name = "澳元/加元",
                Scale = 5,
                Id = 18
            },
            new Symbol
            {
                Code = "AUDJPYbo",
                Name = "澳元/日元",
                Scale = 3,
                Id = 17
            },
            new Symbol
            {
                Code = "AUDUSDbo",
                Name = "澳元/美元",
                Scale = 5,
                Id = 1
            },
            new Symbol
            {
                Code = "BRENT",
                Name = "布伦特原油",
                Scale = 3,
                Id = 13
            },
            new Symbol
            {
                Code = "ChinaA50",
                Name = "中华A50",
                Scale = 1,
                Id = 2
            },
            new Symbol
            {
                Code = "CN300",
                Name = "中华300",
                Scale = 2,
                Id = 3
            },
            new Symbol
            {
                Code = "CrudeOil",
                Name = "原油",
                Scale = 2,
                Id = 14
            },
            new Symbol
            {
                Code = "EURCADbo",
                Name = "欧元/加元",
                Scale = 5,
                Id = 19
            },
            new Symbol
            {
                Code = "EURUSDbo",
                Name = "欧元/美元",
                Scale = 5,
                Id = 4
            },
            new Symbol
            {
                Code = "GBPAUDbo",
                Name = "英镑/澳元",
                Scale = 5,
                Id = 20
            },
            new Symbol
            {
                Code = "GBPJPYbo",
                Name = "英镑/日元",
                Scale = 3,
                Id = 21
            },
            new Symbol
            {
                Code = "GBPUSDbo",
                Name = "英镑/美元",
                Scale = 5,
                Id = 5
            },
            new Symbol
            {
                Code = "NZDUSDbo",
                Name = "纽元/美元",
                Scale = 5,
                Id = 6
            },
            new Symbol
            {
                Code = "USDCADbo",
                Name = "美元/加元",
                Scale = 5,
                Id = 7
            },
            new Symbol
            {
                Code = "USDCHFbo",
                Name = "美元/瑞郎",
                Scale = 5,
                Id = 8
            },
            new Symbol
            {
                Code = "USDCNHbo",
                Name = "美元/人名币",
                Scale = 5,
                Id = 15
            },
            new Symbol
            {
                Code = "USDHKDbo",
                Name = "美元/港币",
                Scale = 4,
                Id = 16
            },
            new Symbol
            {
                Code = "USDJPYbo",
                Name = "美元/日元",
                Scale = 3,
                Id = 9
            },
            new Symbol
            {
                Code = "WTI",
                Name = "美国原油",
                Scale = 3,
                Id = 10
            },
            new Symbol
            {
                Code = "XAGUSDbo",
                Name = "伦敦银",
                Scale = 2,
                Id = 11
            },
            new Symbol
            {
                Code = "XAUUSDbo",
                Name = "伦敦金",
                Scale = 2,
                Id = 12
            }
        };

        public IEnumerable<Symbol> Symbols
        {
            get { return symbols; }
        }

        public Symbol Get(int symbolId)
        {
            foreach (var symbol in this.symbols)
            {
                if(symbol.Id==symbolId)
                    return symbol;
            }
            return null;
        }
    }
}