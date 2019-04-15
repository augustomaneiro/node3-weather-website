const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = "https://api.darksky.net/forecast/d72fe5e79c23d4b600e3e9dc0c6244da/" + latitude + "," + longitude + "?units=si";

  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback("Unable to connect to forecast services!", undefined);
    } else if (body.error) {
      callback("Coordinates error. Try another search.");
    } else {
      const temperature = body.currently.temperature;
      const precipProbability = body.currently.precipProbability;
      const todaySummary = body.daily.data[0].summary;
      const humidity = body.daily.data[0].humidity * 100;
      callback(undefined, `${todaySummary} It is currently ${temperature} degrees out. There is a ${humidity}% of humidity and a ${precipProbability}% chance of rain.`);
    }
  });
};

module.exports = forecast;