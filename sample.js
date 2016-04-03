var config = require('./config.js');
var spreadsheet = require('./spreadsheet.js');

spreadsheet.init(config,function(){
                    var callback = function(){
                        console.log('addRow callback');
                    };
                 
                    var row = {'time':new Date(),'value':'+600','unit':'mA'};
                    spreadsheet.addRow(row,callback);
                 });
