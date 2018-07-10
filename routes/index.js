var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
var Campground = require("../models/campground");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

router.get("/", function(req, res){
   res.render("landing"); 
});




router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

router.post("/register", function(req, res) {
   var newUser = new User({
      username    : req.body.username,
      firstName   : req.body.firstname,
      lastName    : req.body.lastname,
      email       : req.body.email,
      avatar      : req.body.avatar
   });
   User.register(newUser, req.body.password, function(err, user){
      if(err){
          req.flash("error", err.message);   
          return res.redirect("register");
      }
      passport.authenticate("local")(req, res, function(){
         req.flash("success", "Welcome to YelpCamp " + user.username);
         res.redirect("/campgrounds"); 
      });
   });
});

// router.get("/login", function(req, res) {
//    res.render("login"); 
// });

router.post("/login",passport.authenticate("local", {
   successRedirect: "/campgrounds", 
   failiureRedirect: "/login"
}), function(req,res){
     
});

router.get("/users/:id", function(req, res){
   User.findById(req.params.id, function(err, foundUser){
      if(err){
         req.flash("error", "something went wrong:/");
         res.redirect("/");
      }
      Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds){
            if(err){
               req.flash("error", "something went wrong:/");
               res.redirect("/");
            }
            res.render("users/show", {user: foundUser, campgrounds: campgrounds});
      });
   });
});

router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged out!");
   res.redirect("/campgrounds");
});

// router.get("/forget", function(req, res){
//    res.render("forgot.ejs");
// });

// router.


module.exports = router;