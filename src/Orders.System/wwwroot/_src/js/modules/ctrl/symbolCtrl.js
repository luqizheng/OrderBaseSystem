/// <reference path="../services/quotationprovider.js" />
/// <reference path="../services/symbolservice.js" />
function init(wsQuoteUrl) {
    var vm = avalon.define({
        $id: "symbolList",
        symbols: {}
    });

    var services = require("../services/symbolservice");
    services.list()
        .done(function (data) {

            var symbols = {};
            for (var i = 0; i < data.length; i++) {
                symbols[data[i].symbol.id] = data[i];
            }
            vm.symbols = symbols;
            var websocket = require('../services/quotationProvider.js');
            websocket.init(wsQuoteUrl, vm.symbols);
        });
}

module.exports = {
    init: init
}
