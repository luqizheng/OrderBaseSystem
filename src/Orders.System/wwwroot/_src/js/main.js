/// <reference path="modules/services/symbolservice.js" />
/// <reference path="modules/ctrl/symbolctrl.js" />

var symbolService = require("./modules/services/symbolservice.js");

function init() {
    avalon.define({
        $id: "main"
    });


    var symbolctrl = require("./modules/ctrl/symbolctrl.js");
    symbolctrl.init("ws://localhost:5000/quote");

}

init();