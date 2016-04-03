#B35 BLE node
BLEに対応している OWON Digital Multimeter B35 から BLE経由でデータを取得して記録する

##環境
- node.js
- noble
- google-spreadsheet

## Digital Multimeter B35
OWON Digital Multimeter B35のBLE情報  
|UUID|プロパティ|備考|  
|:---|:---|:---|  
|FFF0||B35のサービス|  
|FFF1|Read||  
|FFF2|Read||  
|FFF3|Write||  
|FFF4|Notify|B35に表示されている値|  
|FFF5|Write||  

##node.jsでBLEを扱う
(noble)[https://github.com/sandeepmistry/noble]  
A Node.js BLE (Bluetooth Low Energy) central module

##Google スプレッドシート
(google-spreadsheet)[https://github.com/theoephraim/node-google-spreadsheet]
Google Spreadsheet Data API for Node.js

##電流計測
電流を計測する場合の回路例
(写真と図をここに入れる)
