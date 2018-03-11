
const yargs = require('yargs');
const axios = require('axios');
const argv =yargs
    .options({
      a:{
        demand:true,
        alias:'address',
        describe:'Address to featch weather for',
        string: true
      }
    })
    .help()
    .alias('help','h')
    .argv;
  var encodeAddress = encodeURIComponent(argv.address);
  var geoCodeUrl =`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

  axios.get(geoCodeUrl).then((response)=>{
   if(response.data.status==='ZERO_RESULTS'){
     throw new Error('Unable to find the address.');
   }
   var lat =response.data.results[0].geometry.location.lat;
    var lng =response.data.results[0].geometry.location.lng;
    var weatherUrl =`https://api.darksky.net/forecast/894242c5df56ddcaa8ee4d40c9504e8b/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);

  }).then((response)=>{
    var temperature =response.data.currently.temperature;
    var apparentTemperature =response.data.currently.apparentTemperature;
    console.log(`it's currently ${temperature}. id's feels like ${apparentTemperature}`);
  }).catch((e)=>{
    if(e.code=== 'ENOTFOUND'){
    console.log('Unable to connect to api server.');
  }else {
    console.log(e.message);
  }
    
  });
