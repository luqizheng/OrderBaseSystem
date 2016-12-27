var webApi = require("../webapi").create("/api/orders");

function buy(order) {
    order.clientTime = (new Date()).time;
    return webApi.Post(order);
}

module.exports = {
    buy: buy
};