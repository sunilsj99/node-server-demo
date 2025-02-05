const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log !!");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintainance.hbs");
// });

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    pagePara: "Welcome to Home"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page",
    pagePara: "Welcome to About Page"
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pagePara: "Welcome to projects page !!",
    pageLink: "https://github.com/sunilsj99?tab=repositories"
  })
})

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "error in loading"
  });
});

app.listen(port, () => {
  console.log(`server is up at port ${port}`);
});