const request = require("request");

const forecast = (latitude, longitude, callback) => {
  console.log(latitude, longitude);
  const url =
    "http://api.weatherstack.com/current?access_key=9c87f715b985c96cf62800287cfdf6cc&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service");
    } else if (body.error) {
      callback("Unable to detect location");
    } else {
      callback(
        undefined,
        body.current.weather_descriptions.join(",") +
          ". It is currently " +
          body.current.temperature +
          "*C and there are " +
          body.current.precip +
          " % chances of rain"
      );
    }
  });
};

module.exports = forecast;
