// HTMLで入力フォームを作成し、なにかしら入力する
// 入力された内容を改めてブラウザに出力する　

var mysql = require("mysql"); // mysql操作用のライブラリ
var express = require("express");
var app = express(); // express()メソッドをappという簡潔な名前に置き換え直してるだけ
const path = require("path");
const bodyParser = require("body-parser");

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
    // console.log(result);
    // console.log(field);
  });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "form.html")));

// body-parserを利用して、HTMLの入力フォームからPOSTリクエストで送信されるデータを取得
// expressではPOSTリクエストから送られた内容を受け取り、res.sendでreq.bodyをブラウザに送り返す
// 出力例：{"title":"testtitle","author":"testauthor","publisher":"testpub"}
app.post("/", (req, res) => res.send(req.body));

app.listen(3000);
