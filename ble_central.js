/** BLE での接続処理等を実装したモジュール
 */
function BleCentral(){};

BleCentral.prototype.config = null;
BleCentral.prototype.noble = require('noble');
BleCentral.prototype.callback = null;


//各種 初期化
BleCentral.prototype.init = function(config,callback){
    this.config = config;
    this.callback = callback;
    
    var _this = this;
    this.noble.on('stateChange', function(state) {
                  console.log('stateChange '+state);
                  if (state === 'poweredOn') {
                    //パワー ON 検索 開始
                    _this.noble.startScanning();
                  }
                  else {
                    //パワーOFFになったら検索停止
                    _this.noble.stopScanning();
                  }
             });
    
    
    this.noble.on('discover', function(peripheral) {
                  //console.log(peripheral);
                  _this.discoverPeripheral(peripheral);
             });
    
};

BleCentral.prototype.discoverPeripheral = function(peripheral){
    var advertisement = peripheral.advertisement;
    var localName = advertisement.localName;
    console.log('localName '+ localName);
    
    if(this.config.BLE_B35_LOCAL_NAME != localName){
        //ローカル名が異なった場合は接続処理をしない
        return;
    }
    
    //切断時コールバックを設定
    peripheral.on('disconnect', this.disconnectPeripheral);
    
    //接続処理
    var _this = this;
    peripheral.connect(function(error){
                       _this.connectPeripheral(peripheral,error);
                       });
};

//ペリフェラルから切断された時
BleCentral.prototype.disconnectPeripheral = function(){
    console.log('disconnect');
};

//ペリフェラルと接続
BleCentral.prototype.connectPeripheral = function(peripheral,error){
    console.log('connect');
    //接続成功したらスキャン停止
    this.noble.stopScanning();
    
    var _this = this;
    peripheral.discoverServices([this.config.BLE_B35_SERVICE_UUID],function(error, services){
                                    _this.discoverServices(_this,peripheral,error, services);
                                });
};

//サービス列挙
BleCentral.prototype.discoverServices = function(_this,peripheral,error, services){
    console.log('discoverServices');
    //console.log(services);
    if(services.length == 0){
        //切断
        peripheral.disconnect();
        return;
    }
    //キャラクタリスティック列挙
    var service = services[0];
    
    //キャラクタリスティック列挙
    service.discoverCharacteristics([],function(error, characteristics){
                                        _this.discoverCharacteristics(_this,error,characteristics);
                                    });
};

//キャラクタリスティック列挙
BleCentral.prototype.discoverCharacteristics = function(_this,error, characteristics){
    console.log('discoverCharacteristics');
    
    for(i in characteristics){
        var characteristic = characteristics[i];
        if(characteristic.uuid == _this.config.BLE_B35_NOTIFY_VALUE_CHARACTERISTIC){
            characteristic.on('data',function(data, isNotification){
                                //通知が届いた時に実行される
                                _this.callback.notify(data);
                              });
            characteristic.notify(true, function(error){
                                  console.log("notify");
                                  });
        }
    }
};

module.exports = new BleCentral();
