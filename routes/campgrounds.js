var express = require("express");
var router  = express.Router();
var Comment = require("../models/comments");
var Campground = require("../models/campground");
var middleware = require("../middleware");
var multer = require("multer");
var storage = multer.diskStorage({
   filename: function(req, file, callback){
       callback(null, Date.now() + file.originalname);
   } 
});

var imageFilter = function(req, file, cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
        return cb(new Error('Only image files are allowed!'), false)
    }
    cb(null, true);
};

var upload = multer({storage: storage, filter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({
   cloud_name: 'dfxj4outa',
   api_key   : 453999375899534,
   api_secret:  'qr7Q7uznxn3C0tXfx1aG6InsgtY'
   
});

router.get("/campgrounds", function(req, res){
        //console.log(req.user);
        Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

router.post("/campgrounds", middleware.isLoggedIn, upload.single('image'), function(req, res){
     //res.send("YOU HIT THE POST ROUTE");
     
    //  var name = req.body.name;
    //  var image = req.body.image;
    //  var description = req.body.description;
    //  var author = {
    //      id: req.user._id,
    //      username: req.user.username
    //  }
    //  var newCampground = {name: name,image: image, description: description, author: author};
     
     cloudinary.uploader.upload(req.file.path, function(result){
         req.body.campground.image = result.secure_url;
         req.body.campground.author = {
             id: req.user._id,
             username: req.user.username
         }
             Campground.create(req.body.campground,function(err, newlyCreated){
             if(err){
                 console.log(err);
             }else{
                // console.log(newlyCreated);
                res.redirect("/campgrounds/" + newlyCreated.id);     
             }
         });
     });
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            req.flash('error', err.message);
            return res.redirect('back');
        }else{
            //console.log(foundCampground);
            res.render("campgrounds/show", {campground:foundCampground});
        }
    });
});

router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
            Campground.findById(req.params.id, function(err, foundCampground){
                     res.render("campgrounds/edit",{campground: foundCampground});
            });
});

router.put("/campgrounds/:id", function(req, res){
   
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        } 
   }); 
});

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      }else{
          res.redirect("/campgrounds");
      } 
   });
});

   
    
module.exports = router;