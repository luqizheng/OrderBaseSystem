using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Orders.Quotations;
using Orders.Quotations.Stores;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Order.System.Controllers
{
    [Route("api/[controller]")]
    public class SymbolsController : Controller
    {
        private readonly QuotationContext _quotationContext;
        private readonly ISymbolStore _symbolStore;

        public SymbolsController(ISymbolStore symbolStore, QuotationContext quotationContext)
        {
            if (symbolStore == null) throw new ArgumentNullException(nameof(symbolStore));
            _symbolStore = symbolStore;
            _quotationContext = quotationContext;
        }

        // GET: api/values
        [HttpGet]
        //[Uow(typeof(DbUow))]
        public IEnumerable<object> Get()
        {
            var result = from symbol in _symbolStore.Symbols
                let quote = _quotationContext.Get(symbol.Id)
                select new
                {
                    price = quote?.Bid ?? 0m,
                    info = symbol
                };
            return result;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        //[Uow(typeof(DbUow))]
        public Symbol Get(int id)
        {
            return _symbolStore.Get(id);
        }
    }
}