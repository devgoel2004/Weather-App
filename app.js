const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
const { response } = require("express");
const { loadavg } = require("os");
var location = "Delhi";
var currentTemp = "";
var minTemp = "";
var maxTemp = "";
var image = "";
const apikey = "c62b3ac5f554da4ec6095a8881ed1644";
const Month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/home", (req, res) => {
  res.render("index");
});
app.get("/", (req, res) => {
  const today = new Date();
  const currentDay = today.getDate();
  const month = today.getMonth();
  const currentMonth = Month[month];
  app.post("/", function (req, res) {
    location = req.body.search;
    console.log(location);
    res.redirect("/");
  });
  const apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=c62b3ac5f554da4ec6095a8881ed1644&units=metric";
  https.get(apiURL, (response) => {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      currentTemp = weatherData.main.temp;
      console.log(currentTemp);
      maxTemp = weatherData.main.temp_max;
      console.log(maxTemp);
      minTemp = weatherData.main.temp_min;
      console.log(minTemp);
      image = weatherData.weather.icon;
      console.log(image);
    });
  });
  // const imageURL = `<img src='http://openweathermap.org/img/wn/10d@2x.png' alt='' />`;
  res.render("weather", {
    currentDay: currentDay,
    currentMonth: currentMonth,
    currentTemp: currentTemp,
    minTemp: minTemp,
    maxTemp: maxTemp,
    //image: imageURL,
    location: location,
  });
});

app.listen(4000, function () {
  console.log("Server is running on the port 4000");
});
