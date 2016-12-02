using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Orders.Games;
using Orders.Quotations.Stores;
using Orders.Stores;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Order.System.Controllers
{
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        private readonly IGameStore _store;
        private readonly ISymbolStore _symbolStore;

        public GameController(IGameStore store, ISymbolStore symbolStore)
        {
            _store = store;
            _symbolStore = symbolStore;
        }

        // GET: api/values
        [HttpGet("{symbolId}")]
        public IEnumerable<Game> Get(int symbolId)
        {
            var symbol = _symbolStore.Get(symbolId);
            return _store.List(symbol);
        }
    }
}