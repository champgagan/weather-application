const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 8081;
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectory));
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Gagan" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Gagan" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    help: "This is some helpful text",
    name: "Gagan",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({ error: "you must provide an address!" });
  } else {
    geocode(address, (error, { longitude, latitude, location } = {}) => {
      if (longitude && latitude) {
        forecast(latitude, longitude, (forecasterror, forecastdata) => {
          if (forecasterror) {
            return res.send({ error: forecasterror });
          }
          res.send({
            forecast: forecastdata,
            location: location,
            address,
          });
        });
      } else {
        return res.send({ error });
      }
    });
  }
});

app.get("/products", (req, res) => {
  const { search } = req.query;
  if (!search) {
    return res.send({ error: "you must provide a search term" });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Gagan",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Gagan",
  });
});

app.listen(port, () => {
  console.log("server is started at port 8081");
});
