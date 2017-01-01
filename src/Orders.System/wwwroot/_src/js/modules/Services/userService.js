
var webApi = require("../webapi").create("/api/accounts");

function AccountService() {

}

AccountService.prototype.login = function(strUser, strPwd) {
    return webApi.Post({
        User: strUser,
        Password: strPwd
    });
};
module.exports = {
    AccountService: AccountService
};