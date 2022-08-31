"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const weatherData = require("./data/data.json");
server.use(cors());
const PORT = 3001;

const axios = require("axios");

server.get('/movie', getMovieDataFunction);

server.get("/", (req, res) => {
  res.send("Hi from the home route");
  console.log("Hi from the home route");
});


// http://localhost:3000/test
server.get("/test", (req, res) => {
  res.send("Hi from the test route");

});



// http://localhost:3001/weather
server.get("/weather", (req, res) => {
  let information = weatherData.map((item) => {
    return item.data;
  });
     
  let des = {};
  let weather = information.map((item) => {
    let myArray = item.map((item2) => {
      des.weather = item2.weather;
      des.datetime = item2.datetime;

      return des;
    });
    return myArray;
  });

  res.send(weather);
});

//class07
//http://localhost:3001/Forcast?name=cityName

server.get("/Forcast", (req, res) => {
  // let lat = req.query.lat;
  // let lon = req.query.lon;
  let cityName = req.query.name;
  console.log( cityName);

  let data1 = weatherData.find((item) => {
    console.log((item.city_name === cityName),"the city is ");

    if (
      (item.city_name === cityName)
    ) {
      return true;
    }
  });

  let finalResult = {};
  
  let weatherOfData = data1.data.map((item) => {
    finalResult.description = item.weather.description;
    finalResult.valid_date = item.valid_date;
    console.log(finalResult);

    return { ...finalResult };
  });
  console.log(weatherOfData);

  res.send(weatherOfData);
});

server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
