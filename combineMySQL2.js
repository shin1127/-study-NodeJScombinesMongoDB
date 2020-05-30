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
    // console.log(result);
    // console.log(field);
  });
});

// app.get("/", (req, res) => {
//   // 便宜上引数をreqにしてるだけでrequestでもhogeでもいい、これは仮引数＋コールバック関数
//   const sql = "select * from book";
//   connection.query(sql, (err, result, fields) => {
//     // ここはアロー関数にしても問題なく動く
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.get("/", (req, res) => {
//   const sql =
//     "insert into book(title, author, publisher) values ('微分方程式入門', '南部隆夫', '朝倉書店')";
//   connection.query(sql, (err, result, fields) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

app.get("/", (req, res) => {
  // 便宜上引数をreqにしてるだけでrequestでもhogeでもいい、これは仮引数＋コールバック関数
  const sql = "select * from book";
  connection.query(sql, (err, result, fields) => {
    // ここはアロー関数にしても問題なく動く
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3000);

// app.get()で同じパスを指定すると、一番上のものしか動いてないかもしれん
// app.get()をinsertクエリだけにしてみる
// しかし、node app.jsをターミナルで実行しただけでは[- テーブル]項目？は追加されない
// localhost:3000に接続してはじめてクエリが実行される
