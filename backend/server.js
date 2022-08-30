const express = require('express');
const server = express();
const cors = require('cors');
const weatherdata = require('./data/data.json');
// port

const PORT = 3001;
server.use(cors()); // make the server opened for any request

//http://localhost:3001/
server.get('/',(req,res)=>{
    res.send('Hi from the home route');
})


//http://localhost:3001/test1
server.get('/test1',(req,res)=>{
    res.send('Hi From Test Route');
})

//http://localhost:3001/NameOfCity
server.get('/NameOfCity',(req,res)=>{
  let weatherCloud=weatherdata.map((item)=>{
    return item["city_name"];
  })
  res.send(weatherCloud);
})

//http://localhost:3001/LatOfCity
server.get('/LatOfCity',(req,res)=>{
  let weatherCloud=weatherdata.map((item)=>{
    return item["Lat"];
  })
  res.send(weatherCloud);
})

//http://localhost:3001/LonOfCity
server.get('/LonOfCity',(req,res)=>{
  let weatherCloud=weatherdata.map((item)=>{
    return item["lon"];
  })
  res.send(weatherCloud);

})
//http://localhost:3001/getWeatherData

server.get('/getWeatherData',(req,res) => {
  let weatherCloudResult=weatherdata.find((item)=>{
     if(item.lat === req.query.lat && item.lon === req.query.lon)
     {
      if(req.query.name === "Amman"){
        return res.send(Forcast.amman);
    } else if (req.query.name === "Paris"){
        return res.send(Forcast.paris);
    } else if (req.query.name === "Seattle"){
        return res.send(Forcast.seattle);
    } 
} 
})
res.send(weatherCloudResult);
});

server.get('*',(req,res)=>{
  res.send("404");
})