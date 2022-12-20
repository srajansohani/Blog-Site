//jshint esversion:6
//Setting up express
const express = require("express");
const app = express();
const port = process.env.PORT || 3008;
app.use(express.static("public"));

//seting up body parser and EJS
const bodyParser = require("body-parser");
const ejs = require("ejs");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
var _ = require('Lodash');

//establising mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://srajan:Test123@cluster0.tzfqpm3.mongodb.net/postsDB");

//Creating Post Schema
const postSchema = {
  Title: String,
  Body: String
}
const Post = mongoose.model('Post', postSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// let posts = [];  Array that stores posts.

app.get('/', (req, res) => {
  Post.find((err, foundPosts) => {
    if (!err) {
      console.log(foundPosts);
      res.render('home', {
        startingContent: homeStartingContent,
        posts: foundPosts
      });
    }
  })

})

app.get('/about', (req, res) => {
  res.render('about', { startingContent: aboutContent });
})

app.get('/contact', (req, res) => {
  res.render('contact', { startingContent: contactContent });
})

app.get('/compose', (req, res) => {
  res.render('compose');
})
app.get('/posts/:title', (req, res) => {
  let isValidTitle = 0;
  let indexOfPost;
  const requestedTitle = req.params.title;
  for (var i = 0; i < posts.length; i++) {
    let storedTitle = posts[i].Title;
    if (_.lowerCase(requestedTitle) === _.lowerCase(storedTitle)) {
      indexOfPost = i;
      isValidTitle = 1;
      break;
    }
  }
  if (isValidTitle === 1) {
    console.log("Match Found!");
    res.render('post', {
      posts: posts,
      indexOfPost: indexOfPost
    });
  }
  else {
    console.log("Match not Found!")
  }

})
app.post('/compose', (req, res) => {
  const post = new Post({
    Title: req.body.postTitle,
    Body: req.body.postBody
  });
  post.save();
  res.redirect('/');
})

app.listen(port, function () {
  console.log("Server started on port 3008");
});
