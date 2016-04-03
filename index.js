var config = require('./config.js');
var ble_central = require('./ble_central.js');
var spreadsheet = require('./spreadsheet.js');


spreadsheet.init(config,function(){});


var BleCallback = function(){};

//B35の値を解析する
BleCallback.prototype.b35parse = function(data){
    //+0648 11@
    var cel = data.toString().replace(/\r?\n/g,'').split(' ');
    var row = {'time':'','A':'000'};
    row['time']  = (new Date()).getTime();
    row['A'] = parseInt(cel[0])/1000;
    
    return row;
};

//通知
BleCallback.prototype.notify = function(data){
    //console.log("on notify");
    var row = this.b35parse(data);
    var cb = function(){
        //console.log('addRow callback');
    };
    spreadsheet.addRow(row,cb);
    console.log(row);
};

ble_central.init(config,new BleCallback());
