//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash")
let posts = [];

const homeStartingContent =
  "Welcome to my Page  add  /compose to add a new blog "
const aboutContent =
  "Just a website to post new blogs ";
const contactContent =
  "feel free to contact at nikhilsthomas123@gmail.com";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", { startingContent: homeStartingContent, posts: posts });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutData: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { contactData: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/post/:tetsing", function (req, res) {
  const reqTitle = _.lowerCase(req.params.tetsing) ;
  posts.forEach(function (post) {
    const sTitle = _.lowerCase(post.title);
    if (sTitle === reqTitle) {
      res.render("post",{
        title:post.title,
        content:post.content
      })
      
    }
    
  });
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.dataName,
    content: req.body.dataContent,
  };
  posts.push(post);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
