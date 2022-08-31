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
server.get('/weather', weatherFunction);



server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
