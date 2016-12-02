/// <reference path="../services/userservice.js" />

var Users = require("../services/userservice.js");
var Avalon = require('avalon');
var AccountService = new Users.AccountService();

function init() {


    var vm = Avalon.define({
        $id: "loginCtrl",
        user: {
            password: "",
            loginId: "",
            name: "",
            isLogin: false
        },
        login: function (e) {
            debugger;
            e.preventDefault();
            e.stopPropagation();
            console.log("login....");
            AccountService.login(vm.user.loginId, vm.user.password)
                .done(function (data) {

                    console.log(data);
                    if (data.success) {
                        vm.user.password = "";
                        vm.user.isLogin = true;
                    } else {
                        alert(data.message);
                    }

                });
            return false;
        }
    });
    return vm;
}

module.exports = {
    init: init
};