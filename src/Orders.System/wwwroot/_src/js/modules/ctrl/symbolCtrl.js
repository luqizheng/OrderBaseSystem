﻿/// <reference path="../services/quotationprovider.js" />
/// <reference path="../services/symbolservice.js" />
var avalon = require('avalon');

var ReduxActionDefined = require("./reduxAction.js");

function Init(wsQuoteUrl,globalStore) {

    var vm = avalon.define({
        $id: "symbolList",
        symbols: {},
        activeId:0,
        active:function(symbol){
            if(vm.activeId)
                vm.symbols[vm.activeId].active=false;
            symbol.active=true;
            vm.activeId=symbol.info.id;
            globalStore.dispatch(ReduxActionDefined.getChangeSymbol(symbol));
        }
     
    });

    var services = require("../services/symbolservice");
    services.list()
        .done(function (data) {

            var symbols = {};
            var defSymBolId=false;
            for (var i = 0; i < data.length; i++) {
                symbols[data[i].info.id] = data[i];
                data[i].active=false;
                if(!defSymBolId)                
                     defSymBolId=data[i].info.id;
            }
            vm.symbols = symbols;
            vm.activeId=defSymBolId;
          
            InitQuotationProvider(vm,wsQuoteUrl);
            vm.active(vm.symbols[defSymBolId]);
            
        });


}

function InitQuotationProvider(vm,wsQuoteUrl){
   var quotationProvider = require('../services/quotationProvider.js');
    quotationProvider.init(wsQuoteUrl, vm.symbols);
}

module.exports = {
    CreateCtrl: Init
}
