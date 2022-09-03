"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();

server.use(cors());
const PORT = 3001;

const axios = require("axios");


server.get("/", (req, res) => {
  res.send("Hi from the home route");
  console.log("Hi from the home route");
});


// http://localhost:3001/test
server.get("/test", (req, res) => {
  res.send("Hi from the test route");

});



// // http://localhost:3001/weather
// let weatherFunction=require("./weather");
// server.get('/weather', weatherFunction);

// http://localhost:3001/movie
let getMovieDataFunction=require('./movie');
server.get('/movie', getMovieDataFunction);

//http://localhost:3001/Forcast?name=cityName
const weatherData = require("./data/data.json");
  
server.get("/Forcast", (req, res) => {
  // let lat = req.query.lat;
  // let lon = req.query.lon;
  let cityName = req.query.name;
  console.log( cityName);

  let data1 = weatherData.find((item) => {
    console.log((item.city_name === cityName),"the city is ");

    if (
      (item.city_name.toLowerCase() === cityName)
    ) {
      return true;
    }
  });

  let finalResult = {};
  
  let weatherOfData = data1.data.map((item) => {
    finalResult.description = item.weather.description;
    finalResult.datetime = item.datetime;
    console.log(finalResult);

    return { ...finalResult };
  });
  console.log(weatherOfData);

  res.send(weatherOfData);
});




server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
