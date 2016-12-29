class OrderEvent {
    event: string
    order: any

}
export class OrderNotify {
    constructor(url: string) {
        this.url = url;
    }

    url: string;
    ws: WebSocket;

    onClose(order: any) {
        console.log('onClose', order);
    }


    onOpen(order: any) {
        console.log('onOpen', order);
    }

    connect() {
        var self = this;
        this.ws = new WebSocket(this.url);
        this.ws.onopen = msg => {
            console.log(msg);
            console.log("连接上服务器");
        };

        this.ws.onmessage = msg => {
            console.log(msg.data);
            var eventOrder = <OrderEvent>JSON.parse(msg.data);
            switch (eventOrder.event) {
                case "open":
                    self.onOpen(eventOrder.order);
                    break;
                case "close":
                    self.onClose(eventOrder.order);
                    break;
            }
        }
    }

    disconnect() {
        this.ws.close();
    }


}