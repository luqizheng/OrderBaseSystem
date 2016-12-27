function OrderNotify(url) {
    this.url = url;
    this.ws = null;
}

OrderNotify.prototype.onClose = function (order) {
    console.log('onClose', order);
}

OrderNotify.prototype.onOpen = function (order) {
    console.log('onOpen', order);
}

OrderNotify.prototype.connect = function () {
    var self = this;
    this.ws = new WebSocket(self.url);
    this.ws.onopen = function (msg) {
        console.log(msg);
        console.log("连接上服务器");
    };

    this.ws.onmessage = function (msg) {
        console.log(msg.data);
        var eventOrder = JSON.parse(msg.data);
        self["on" + eventOrder.event](eventOrder.Order);
    }
}

OrderNotify.disconnect = function () {
    this.ws.close();
}


modules.exports = {
    OrderNotify: OrderNotify
}