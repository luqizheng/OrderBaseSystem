
var webApi = require("../webapi").create("/api/accounts");
function AccountService() {
    this.login = function (strUser, strPwd) {
        return webApi.Post({
            User: strUser,
            Password: strPwd
        });
    }
}
module.exports = {
    AccountService: AccountService
}
