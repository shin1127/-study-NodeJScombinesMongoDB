# Node.jsでDBを操作する

## Things I learned

### MongoDB

-  MongoDBのクエリはJSの文法に近いらしい（MySQLと比べたら確かにプログラミング言語っぽい）
-  NoSQLの中ではMongoDBは別にメジャーではないらしい　Node.jsのテキストでよく紹介されてるのは上の理由からかも
-  NoSQLではKVSが一番メジャーかもしれないらしい　→ redis

### MySQL(MariaDB)

-  ファイルパスを入力するときはエスケープシーケンスに注意する \rや\r\nだけでなく、tやbもある
-  host: "localhost"　とすると、自動的に3306番（MySQLのポート）につないでくれる。でも手動でポート番号切り替えてる場合は無理
-  `app.get("/", (req, res) => {`の第二引数はコールバック関数の仮引数なので、request, responseと表記してもいい
-  `connection.query(sql, function (err, result, field) {` のresultがクエリの実行結果みたい
-  ↑はfunctionじゃなくてアロー関数でもOK
-  `var express = require("express");var app = express();` expressモジュールを簡便のため、appという変数名に置き換えてる
-  app.get()で同じパス（"/"とか）を複数指定すると、一番上のしか反応しない（その時点でレスポンスが返ってしまう）
-  `node app.js`で実行しても、localhostでブラウザ開かないとapp.get()のクエリは実行されない
-  functionでもアロー関数でも、その中で宣言されたconstやletはローカルスコープになる
-  SQLインジェクションを回避せよ
-  static関数をrequireすると、静的ファイルの初期の参照先を指定できる
-  あいまい検索をしたい　→　正規表現　→　select * from book where title like "%hoge%hoge"　（%は任意の文字列）


/hoge/fuga/bar.ejsにアクセスする→index.ejsにレンダリングする　という形で、index.ejsがブラウザに表示される  
しかし、実質的に参照しているディレクトリは/hoge/fugaってことになってる  

- アンチパターン　../../../../../index.css

## environment development

Node.js 12.16.3  
mongodb 3.0(Node.jsに導入するライブラリ)  
MongoDB 3.4.24  
MariaDB Ver 15.1 Distrib 10.4.11  
