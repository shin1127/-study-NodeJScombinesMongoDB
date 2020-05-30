// あらかじめMariaDBに作成したbookというテーブルから、書籍情報を取り出しローカルサーバーに表示する
// ただしこのソースコードでは出力される内容を成形できていない
// \rが入っているのはデータベースに取り込んだCSVファイル内の問題かも

// 出力（本来は全く改行されない）
// [{"title":"スッキリわかるJava入門","author":"中山清喬","publisher":"インプレス\r"},{"title":"スッキリわかるJava入門 実践編",
// "author":"中山清喬","publisher":"インプレス\r"},{"title":"スッキリわかるサーブレット & JSP入門","author":"国本大悟",
//   "publisher":"インプレス\r"},{"title":"Pythonチュートリアル","author":"Guido van Rossum","publisher":"o'reilly\r"},
//     {"title":"図解でわかる統計解析","author":"前野昌弘 三國彰","publisher":" 日本実業出版社\r"},{"title":"考える技術としての統計学",
//       "author":"飯田泰之","publisher":"NHKブックス\r"},{"title":"手に取るように心理学がわかる本","author":"渋谷昌三 小野寺敦子",
//         "publisher":" かんき出版\r"},{"title":"基礎からのMySQL改訂版","author":"西沢夢路","publisher":"SB Creative"}]

var mysql = require("mysql"); // mysql操作用のライブラリ
var express = require("express");
var app = express(); // express()メソッドをappという簡潔な名前に置き換え直してるだけ

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "db1",
});

// MySQLに接続してクエリを実行し、結果を取得する

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected");

  const sql = "select * from book";
  connection.query(sql, function (err, result, field) {
    if (err) throw err;
    console.log("table shows");
    console.log(result);
    console.log(field);
  });
});

app.get("/", (req, res) => {
  // 便宜上引数をreqにしてるだけでrequestでもhogeでもいい、これは仮引数＋コールバック関数
  const sql = "select * from book";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3000);
