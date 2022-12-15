const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/weather.html");
});
app.post("/", (req, res) => {
  const x = req.body.search;
  console.log(x);
  res.redirect("/home");
});
app.listen(1200, () => {
  console.log("Server is running on the port 1200");
});
