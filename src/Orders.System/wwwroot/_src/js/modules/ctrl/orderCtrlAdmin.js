
/// <reference path="../services/orderNotify.js" />

var Avalon=require("avalon");
var OrderNotify=require("../services/orderNotify");
var orderAdminCtrl=null;

var orderNotify=null;
module. exports={

        createCtrl:createCtrl,
        start:function(strUrl){
            orderNotify=new OrderNotify(strUrl)
            orderNotify.onOpen=function(){}
            orderNotify.onClose=function(){}
            orderNotify.connect();
        },
        stop:function(){
            orderNotify.disconnect();
        }
    }


function createCtrl(){
    orderAdminCtrl= vm=avaon.define({
        $id:"orderAdminCtrl",
        orders:[]        
    })
   return vm;
}

