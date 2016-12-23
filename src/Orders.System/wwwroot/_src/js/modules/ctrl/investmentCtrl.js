/// <reference path="../services/orderservice.js" />
var avalon = require('avalon');
var orderService = require('../services/orderService.js');
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
        orderService.buy(postData)
            .done(function (d) {
                alert(JSON.stringify(d));
            })
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