var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comments");
middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        
            Comment.findById(req.params.comments_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }else{
               //console.log(foundCampground);
               if(foundComment.author.id.equals(req.user._id)){
                     next();   
               }else{
                   req.flash("error", "You are not authorised to do that!");
                   res.redirect("back");
               }
            } 
        });
    }else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        
            Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
               req.flash("error", "Campground not found");
               res.redirect("back");
           }else{
               //console.log(foundCampground);
               if(foundCampground.author.id.equals(req.user._id)){
                     next();   
               }else{
                   req.flash("error", "You are not authorised to do that!");
                   res.redirect("back");
               }
            } 
        });
    }else{
        req.flash("error", "You need to be logged in to do that!"); 
        res.redirect("back");
    }    
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");    
}

module.exports = middlewareObj;