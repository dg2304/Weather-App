const request =require('request');

var getWeather = (lat,lng,callback)=>{
  request({
    url:`https://api.darksky.net/forecast/894242c5df56ddcaa8ee4d40c9504e8b/${lat},${lng}`,
    json:true
  },(error,response,body)=>{
    if(error){
      callback('Unable to connect to Server.');
    }else if (response.statusCode===400) {
      callback('Unable to fetch weather.');
    }else if (response.statusCode===200) {
      callback(undefined,{
        temperature:body.currently.temperature,
        apparentTemperature:body.currently.apparentTemperature
      });
    }
  });
};

module.exports.getWeather=getWeather;
