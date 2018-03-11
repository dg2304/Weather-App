
const yargs = require('yargs');
const geocode= require('./geocode/geocode.js');
const weather = require('./weather/weather');
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
    var feToce=(f)=>{
      return ((f-32) * 5)/9;
    };
  geocode.geocodeAdress(argv.address, (errorMessage,results)=>{
    if(errorMessage){
      console.log(errorMessage);
    }else {
      console.log(results.address);
      weather.getWeather(results.Lantitude,results.longitude, (errorMessage,weatherResults)=>{
        if(errorMessage){
          console.log(errorMessage);
        }else{
           console.log(`It's currently ${feToce(weatherResults.temperature)}~C. It feels like ${feToce(weatherResults.apparentTemperature)}~C.`);
           console.log(`It's currently ${weatherResults.temperature}~F. It feels like ${weatherResults.apparentTemperature}~F.`);
        }
      });
    }
  });
