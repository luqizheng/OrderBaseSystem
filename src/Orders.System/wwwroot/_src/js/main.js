/// <reference path="modules/ctrl/loginctrl.js" />
/// <reference path="modules/services/symbolservice.js" />
/// <reference path="modules/ctrl/symbolctrl.js" />
/// <reference path="../../../node_modules/redux/dist/redux.js"/>
/// <reference path="modules/ctrl/reduxAction.js"/>
var avalon = require('avalon');
var symbolService = require("./modules/services/symbolservice.js");
var Redux = require("../../../node_modules/redux/dist/redux")
var ReduxActionDefined = require("./modules/ctrl/reduxAction.js");
var globalState = {
    currentSymbolId: 0
};
function CreateGlobalStore(inverstmentCtrl) {
    //http://cn.redux.js.org/docs/introduction/ThreePrinciples.html
    function globalReduce(state, action) {
        if (typeof state === 'undefined') {
            return globalState;
        }
        switch (action.type) {
            case ReduxActionDefined.DEFINED.ChangeSymbol:
                console.log('change to ', action.symbol);
                inverstmentCtrl.setSymbol(action.symbol);
            default:
                return state;
        }
    }
    var symbolStore = Redux.createStore(globalReduce);
    return symbolStore;
}
function init() {

    //初始化购买面版
    var inverstmentCtrl = require("./modules/ctrl/investmentCtrl").createCtrl();
    var symbolStore = CreateGlobalStore(inverstmentCtrl);

    //品种面版，包含了报价
    var symbolctrl = require("./modules/ctrl/symbolctrl.js");
    symbolctrl.CreateCtrl("ws://localhost:5000/quote", symbolStore);
  
    //登录
    var loginCtrl = require("./modules/ctrl/loginctrl.js").init();
  
}

init();