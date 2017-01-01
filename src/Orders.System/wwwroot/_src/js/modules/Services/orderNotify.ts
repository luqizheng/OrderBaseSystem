class OrderEvent {
    event: string;
    order: any;
}

export class OrderNotify {
    constructor(url: string) {
        this.url = url;
    }

    url: string;
    ws: WebSocket;

    onClose(order: any) {
        console.log("onClose", order);
    }


    onOpen(order: any) {
        console.log("onOpen", order);
    }

    connect() {
        var self = this;
        this.ws = new WebSocket(this.url);
        this.ws.onopen = (msg: any) => {
            console.log(msg);
            console.log("连接上服务器");
        };

        this.ws.onmessage = (msg: any) => {
            console.log(msg.data);
            var eventOrder = JSON.parse(msg.data) as OrderEvent;
            switch (eventOrder.event) {
            case "open":
                self.onOpen(eventOrder.order);
                break;
            case "close":
                self.onClose(eventOrder.order);
                break;
            }
        };
    }

    disconnect() {
        this.ws.close();
    }


}