var webApi = require("../webapi").create("/api/orders");

function buy(order) {
    return webApi.Post(order);
}

module.exports = {
    buy: buy
}