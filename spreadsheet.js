/** Googleスプレッドシート
 *
 */
function Spreadsheet(){};

Spreadsheet.prototype.GoogleSpreadsheet = require('google-spreadsheet');
Spreadsheet.prototype.config = null;
Spreadsheet.prototype.sheet = null;
Spreadsheet.prototype.worksheet = null;

//初期化
Spreadsheet.prototype.init = function(config,callback){
    this.config = config;
    //認証情報
    var credentials = require(config.GOOGLE_SPREADSHEET_KEY_JSON);

    //ワークシート
    var sheet = new Spreadsheet.prototype.GoogleSpreadsheet(config.GOOGLE_SPREADSHEET_ID);
    
    //認証をする
    this.useServiceAccountAuth(credentials,sheet,callback);
};

//認証をする
Spreadsheet.prototype.useServiceAccountAuth = function(credentials,sheet,callback){
    var _this = this;
    sheet.useServiceAccountAuth(credentials, function(err){
                                   sheet.getInfo(function(err, data){
                                                    _this.sheet = data;
                                                    var title = _this.config.GOOGLE_SPREADSHEET_WORK_SHEET_TITLE;
                                                    _this.selectWorksheet(_this,data,title,callback);
                                                });
                                   
                                   });
};

//ワークシートを設定
Spreadsheet.prototype.selectWorksheet = function(_this,sheet,title,callback){
    //console.log( 'selectWorksheet' );
    for(var i in sheet.worksheets) {
        var worksheet = sheet.worksheets[i];
        if(worksheet.title === title) {
            _this.worksheet = worksheet;
            //ヘッダー追加
            var cb = function(){
                //console.log( 'setHeaderRow callback' );
            };
            _this.worksheet.setHeaderRow(_this.config.GOOGLE_SPREADSHEET_WORK_SHEET_HEADER_ROW,cb);
        }
    }
    callback();
};

//データ追加
Spreadsheet.prototype.addRow = function(new_row,callback){
    this.worksheet.addRow(new_row, callback);
};


module.exports = new Spreadsheet();