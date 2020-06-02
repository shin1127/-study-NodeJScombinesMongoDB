var mysql = require("mysql"); // mysql操作用のライブラリ
var express = require("express");
var app = express(); // express()メソッドをappという簡潔な名前に置き換え直してるだけ
const path = require("path");
const bodyParser = require("body-parser"); // HTMLの入力ボックスの中身をNode.jsで取得するため
const ejs = require("ejs");

app.set("view engine", "ejs");

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

// app.get("/", (req, res) => res.sendFile(path.join(__dirname, "form.html")));

app.get("/", (req, res) => {
  const sql = "select * from book";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("index", { book: result }); // resultで得た内容からbookの内容だけ取得したいということ？
  });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.get("/delete/:title", (req, res) => {
  const sql = "DELETE FROM book WHERE title = ?";
  connection.query(sql, [req.params.title], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.get("/edit/:title", (req, res) => {
  const sql = "select * from book where title = ?";
  connection.query(sql, [req.params.title], function (err, result, fields) {
    if (err) throw err;
    res.render("edit", { book: result });
  });
});

// app.post("/update/:title", (req, res) => {
//   const sql = "UPDATE book SET ? WHERE title = '" + req.params.title + "'";
//   console.log(sql);
//   connection.query(sql, req.body, function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     res.redirect("/");
//   });
// });

app.post("/update/:title", (req, res) => {
  const sql = "UPDATE book SET ? WHERE title = ?";

  console.log(sql);
  console.log(req.body);
  connection.query(sql, [req.body, req.params.title], function (
    err,
    result,
    fields
  ) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

// app.post("/", (req, res) => {
//   const sql = "insert into book set ?";

//   connection.query(sql, req.body, function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     res.send("登録が完了しました");
//   });
// });
app.listen(3000);
