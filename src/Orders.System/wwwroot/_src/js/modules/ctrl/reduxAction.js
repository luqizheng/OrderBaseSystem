var ACTION_DEFINED = {
    ChangeSymbol: "ChangeSymbol",
    Login: "Login"
};

module.exports = {
    DEFINED: ACTION_DEFINED,
    getChangeSymbol: function(symbol) {
        return {
            type: ACTION_DEFINED.ChangeSymbol,
            symbol: symbol
        };
    },
    getLoginAction: function(isLogin) {
        return {
            type: ACTION_DEFINED.Login,
            isLogin: isLogin
        };
    }
};