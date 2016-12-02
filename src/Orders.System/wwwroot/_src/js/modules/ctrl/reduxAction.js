var ACTION_DEFINED={
    ChangeSymbol:"ChangeSymbol",

}

module.exports={
    DEFINED:ACTION_DEFINED,
    getChangeSymbol:function(symbol){
        return {
            type:ACTION_DEFINED.ChangeSymbol,
            symbol:symbol
        };
    }
}