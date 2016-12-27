/// <reference path="../services/ordernotify.js" />
var Avalon = require('avalon');
var OrderNotify = require("../services/ordernotify.js");

function init(wsUrl) {
    var orderNotify = new OrderNotify(wsUrl);

    var vm = Avalon.define({
        $id: "orderAdminCtrl",
        orders: []

    });

    return vm;
}