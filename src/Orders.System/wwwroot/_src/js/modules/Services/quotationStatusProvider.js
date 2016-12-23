function init(url, symbols, func) {
    var ws = new WebSocket(url);
    ws.onopen = function (msg) {
        console.log(msg);
        console.log("连接上服务器");
        ws.send("start");
    };

    ws.onclose = function (msg) {
        if (msg.code !== 1006) {
            console.error(msg.reason);
        } else {
            init(url, symbols, func);
        }
    };
    ws.onmessage = function (msg) {
        var ary = msg.data.split(",");
        var symbol = symbols[parseInt(ary[0])];
        symbol.seq = ary[1];
        symbol.amp = ary[2];
    };
    ws.onerror = function (error) {
        console.error(error);
    };
}

module.exports = {
    init: init
};