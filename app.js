var express       = require("express"),
    app           = express(),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comments"),
    methodOverride= require("method-override"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    User          = require("./models/user"),
    flash         = require("connect-flash"),
    seedDB        = require("./seeds");

var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index"); 

//seedDB();
mongoose.connect("mongodb://127.0.0.1:27017/yelp_camp");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "I AM THE BEST",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started!");
});

