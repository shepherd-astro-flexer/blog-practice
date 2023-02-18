const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const content = require(__dirname + "\\content.js");

const inputs = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {content: content.homeContent, composeInputs: inputs});
})

app.get("/about", (req, res) => {
  res.render("about", {content: content.aboutContent});
})

app.get("/contact", (req, res) => {
  res.render("contact", {content: content.contactContent});
})

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.post("/compose", (req, res) => {
  const input = {
    title: req.body.title,
    post: req.body.post
  }

  inputs.push(input);

  res.redirect("/") // This is a GET request going to the root route
})

app.get("/posts/:postName", (req, res) => {
  const params = _.lowerCase(req.params.postName);
  
  inputs.forEach(input => {
    const inputTitle = _.lowerCase(input.title);
    if (inputTitle.includes(params)) {
      res.render("post", {title: input.title, post: input.post});
    } 
   })
})

app.listen(3000, () => {
  console.log("Server has started on port 3000.")
})