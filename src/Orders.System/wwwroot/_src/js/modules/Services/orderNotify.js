"use strict";
var OrderEvent = (function () {
    function OrderEvent() {
    }
    return OrderEvent;
}());
var OrderNotify = (function () {
    function OrderNotify(url) {
        this.url = url;
    }
    OrderNotify.prototype.onClose = function (order) {
        console.log("onClose", order);
    };
    OrderNotify.prototype.onOpen = function (order) {
        console.log("onOpen", order);
    };
    OrderNotify.prototype.connect = function () {
        var self = this;
        this.ws = new WebSocket(this.url);
        this.ws.onopen = function (msg) {
            console.log(msg);
            console.log("连接上服务器");
        };
        this.ws.onmessage = function (msg) {
            console.log(msg.data);
            var eventOrder = JSON.parse(msg.data);
            switch (eventOrder.event) {
                case "open":
                    self.onOpen(eventOrder.order);
                    break;
                case "close":
                    self.onClose(eventOrder.order);
                    break;
            }
        };
    };
    OrderNotify.prototype.disconnect = function () {
        this.ws.close();
    };
    return OrderNotify;
}());
exports.OrderNotify = OrderNotify;
//# sourceMappingURL=orderNotify.js.map