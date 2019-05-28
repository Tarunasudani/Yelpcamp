var express      =  require("express"),
    app          =  express(),
    bodyparser   =  require("body-parser"),
    mongoose     =  require("mongoose"),
    passport     =  require("passport"),
    LocalStrategy =  require("passport-local"),
    Campground   =  require("./models/campground.js"),
    Comment      =  require("./models/comment"),
    User         =  require("./models/user"),
    seedDB       =  require("./seeds")

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
// seedDB();
//passport configuration
app.use(require("express-session")({
  secret:"Once again rustyt sucks",
  resave:false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
  res.locals.currentUser=req.user;
  next();
});
mongoose.connect("mongodb+srv://tarun:*tarun2207*@yelpcamp-u2geq.mongodb.net/test?retryWrites=true");
//mongodb+srv://tarun:*tarun2207*@yelpcamp-u2geq.mongodb.net/test?retryWrites=true
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.listen(3000,function(){
    console.log("the server has started ");
});
