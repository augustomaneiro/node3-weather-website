const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath)); 
  
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Andrew"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "This is the help message.",
    title: "Help",
    name: "Andrew"
  })
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }

      res.send({
        forecast: forecastData,
        location, 
        address: req.query.address
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404-page", {
    title: "404",
    name: "Andrew",
    errorMessage: "Help article not found."
  })
});

app.get("*", (req, res) =>{
  res.render("404-page", {
    title: "404",
    name: "Andrew",
    errorMessage: "Page not found."
  })
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});