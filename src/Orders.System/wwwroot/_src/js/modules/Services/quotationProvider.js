function init(url, symbols, func) {
    var ws = new WebSocket(url);
    ws.onopen = function(msg) {
        console.log(msg);
        console.log("连接上服务器");
        ws.send("start");
    };

    ws.onclose = function(msg) {
        if (msg.code != 1006) {
            console.error(msg.reason);
        } else {
            init(url, symbols, func);
        }
    };
    ws.onmessage = function(msg) {
        var ary = msg.data.split("|")[1].split(",");
        var symbol = symbols[parseInt(ary[0])];
        symbol.price = parseFloat(ary[1]) / Math.pow(10, symbol.info.scale);
    };
    ws.onerror = function(error) {
        console.error(error);
    };
}

module.exports = {
    init: init
};