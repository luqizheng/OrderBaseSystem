// / <reference path="../services/ordernotify.js" />
var Avalon = require("avalon");

var OrderNotify = require("../services/ordernotify").OrderNotify;

var orderNotify = null;

var ordersVM;

function init(wsUrl, globalStore) {
    orderNotify = new OrderNotify(wsUrl);
    ordersVM = Avalon.define({
        $id: "orderAdminCtrl",
        orders: []

    });
}

module.exports = {
    CreateCtrl: init,
    Start: function() {
        orderNotify.connect();
    },
    Add: function(order) {
        ordersVM.orders.push(order);
    },
    Stop: function() {
        orderNotify.disconnect();
    }
};