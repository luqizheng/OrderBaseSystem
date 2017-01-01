function QuotationProvider(url) {
    this.url = url;
    this.ws = null;
}

QuotationProvider.prototype.disconnect = function() {
    this.ws.close();
};
QuotationProvider.prototype.onQuotation = function(quotation) {
    console.log("please set onQuotation to receive quotation from server,quotation:", quotation);
};

QuotationProvider.prototype.connect = function() {

    var self = this;
    this.ws = new WebSocket(this.url);
    this.ws.onopen = function(msg) {
        console.log(msg);
        console.log("连接上服务器");
        self.ws.send("start");
    };

    this.ws.onclose = function(msg) {
        if (msg.code != 1006) {
            console.error(msg.reason);
        } else {
            init(url, symbols, func);
        }
    };
    this.ws.onmessage = function(msg) {
        var ary = msg.data.split("|")[1].split(",");
        /* var symbol = symbols[parseInt(ary[0])];
         symbol.price = parseFloat(ary[1]) / Math.pow(10, symbol.info.scale);*/
        self.onQuotation({
            id: parseInt(ary[0]),
            bid: parseFloat(ary[1])
        });
    };
    this.ws.onerror = function(error) {
        console.error(error);
    };
};

module.exports = QuotationProvider;