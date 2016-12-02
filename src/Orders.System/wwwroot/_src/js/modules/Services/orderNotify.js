function OrderNotify(url) {
    var ws = new WebSocket(url);
    ws.onopen = function (msg) {
        console.log(msg);
        console.log("连接上服务器");
    };

    ws.onmessage = function (msg) {
        console.log(msg.data);
    }
}
modules.exports = {
    OrderNotify: OrderNotify
}