function QuotationStatusProvider(url) {
    this.url = url;
    this.ws = null;

}

QuotationStatusProvider.prototype.onStatus = function(status) {
    console.log("receive ", status);
};
QuotationStatusProvider.prototype.disconnect = function() {
    this.ws.close();
};
QuotationStatusProvider.prototype.connect = function() {
    var ws = this.ws = new WebSocket(url);
    var self = this;
    ws.onopen = function(msg) {
        console.log(msg);
        console.log("连接上服务器");
        ws.send("start");
    };

    ws.onclose = function(msg) {
        if (msg.code !== 1006) {
            console.error(msg.reason);
        } else {
            init(url, symbols, func);
        }
    };
    ws.onmessage = function(msg) {
        var ary = msg.data.split(",");
        var symbol = {
            id: symbols[parseInt(ary[0])],
            seq: ary[1],
            amp: ary[2],
        };

        self.onStatus(symbol);


    };
    ws.onerror = function(error) {
        console.error(error);
    };
};
module.exports = QuotationStatusProvider;