const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}))





let accountRouter = require("./account-router");
let artWorkRouter = require("./artwork-router");
app.use("/account",accountRouter);
app.use("/",express.static("public"));
app.use("/account/register",express.static("public"));
app.use("/arts",express.static("public"));
app.use("/arts/artworkSearch",express.static("public"));
app.use("/arts",artWorkRouter);






//Route for rendering the login page
app.get("/",function(req,res,next){
  res.format({
    'text/html': function(){
      res.render('pages/login',{});
    },
    default: function(){res.status(406).send('Not Acceptable');}
  });
  next();
});






//Route for getting the login page specified by the user
app.get("/artwork/:category/:medium",function(req,res,next){

});


mongoose.connect('mongodb://127.0.0.1/gallery');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',async function(){
  app.listen(3000);
  console.log("Listening on port 3000");
});

