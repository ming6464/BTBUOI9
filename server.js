const express = require("express");
const bodyParser = require("body-parser");
const exhbs = require("express-handlebars");
const db = require("mongoose");
const model = require("./model");
const app = express();
const port = 8099;
const uri =
  "mongodb+srv://giaminh16092003:7rN6UlGBcmZm2Czu@mongotest.hdbc0el.mongodb.net/cp17305?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine(
  "hbs",
  exhbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: "./views/layouts",
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");

app.listen(port, (err) => {
  if (err) throw err;
  console.log("connect success port : " + port);
});

app.get("/", (req, res) => {
  connect();
  res.render("home");
});

app.get("/getList", async (req, res) => {
  let list = await model.find();
  res.json(list);
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await model.deleteOne({ _id: id });
  res.send("true");
});
app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const obj = req.body;
  await model.updateOne({ _id: id }, obj);
  res.json(obj);
});
app.post("/add", async (req, res) => {
  const obj = req.body;
  model.create(obj);
  let list = await model.find();
  res.json(list[list.length - 1]);
});

function connect() {
  db.connect(uri).then(console.log("success !"));
}
