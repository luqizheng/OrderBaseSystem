// / <reference path="../services/quotationprovider.js" />
// / <reference path="../services/symbolservice.js" />
// / <reference path="../services/quotationstatusprovider.js" />
var avalon = require('avalon');

var ReduxActionDefined = require('./reduxAction.js')
var quotationProvider = null;
function Init (url, globalStore, quotationStatusUrl) {
  var vm = avalon.define({
    $id: 'symbolList',
    symbols: {},
    activeId: 0,
    active: function (symbol) {
      if (vm.activeId)
        vm.symbols[vm.activeId].active = false
      symbol.active = true
      vm.activeId = symbol.info.id
      globalStore.dispatch(ReduxActionDefined.getChangeSymbol(symbol))
    }

  })

  var services = require('../services/symbolservice')
  services.list()
    .done(function (data) {
      var symbols = {}
      var defSymBolId = false
      for (var i = 0; i < data.length; i++) {
        symbols[data[i].info.id] = data[i]
        data[i].active = false
        data[i].seq = 0; // 频率
        data[i].amp = 0; // 幅度
        if (!defSymBolId)
          defSymBolId = data[i].info.id
      }
      vm.symbols = symbols
      vm.activeId = defSymBolId
      vm.active(vm.symbols[defSymBolId])
    })
  var QuotationProvider = require('../services/quotationProvider')
  quotationProvider = new QuotationProvider(url)
  quotationProvider.onQuotation = function (quotation) {
    vm.symbols[quotation.id].price = quotation.bid
  }
  if (quotationStatusUrl) {
    var QuotationStatusProvider = require('../services/quotationStatusProvider')
    quotationProvider = new QuotationStatusProvider(quotationStatusUrl)
    quotationProvider.onStatus(function (status) {
      var symbol = vm.symbols[status.id]
      symbol.seq = status.seq
      symbol.amp = status.amp
    })
  }
}

module.exports = {
  CreateCtrl: Init,
  StartQuotationProvider: function () {
    quotationProvider.connect()
  },
  StopQuotationProvidder: function () {
    quotationProvider.disconnect()
  }
}
