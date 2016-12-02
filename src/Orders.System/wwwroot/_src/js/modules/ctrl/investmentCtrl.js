/// <reference path="../services/orderservice.js" />
var avalon = require('avalon');
var orderService = require('../services/orderservice.js');
function init() {
    var vm = avalon.define({
        $id: "investmentCtrl",
        symbol: {
            price: 0,
            symbol: {
                name: 'test'
            }
        },
        openOrderInfo: {
            volume: 20,
            direction: 1,
            gameId: 1

        },
        up: function () {
            console.log("up")
            but(0);
        },
        down: function () {
            console.log("down");
            but(1);
        }
    });
    function but(upOrDown) {

        var postData = vm.openOrderInfo.$model;
        postData.direction = upOrDown;
        postData.clientTime = (new Date()).time;
        debugger;
        orderService.buy(postData)
        .error(buyError);
    }
    function buyError(e) {
        alert(e.responseText);
    }
    return vm;
}


module.exports = {
    createCtrl: function () {
        var vm = init();
        return {
            setSymbol: function (symbol) {
                vm.symbol = symbol;
            }
        }
    }
}