var config = require('./config.js');
var ble_central = require('./ble_central.js');

var BleCallback = function(){};

//通知
BleCallback.prototype.notify = function(data){
    console.log("on notify");
    console.log(data.toString());
};

ble_central.init(config,new BleCallback());
