/// <reference path="../webapi.js" />
var webApi=require("../webapi").create("/api/symbols");

module.exports = {
    list: function () {
        return webApi.Get();
    }
}