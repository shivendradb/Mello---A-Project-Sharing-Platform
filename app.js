var express = require("express");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user")
var seedDB = require("./seeds");
var methodOverride = require("method-override");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");


var app = express();

//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//db connection
mongoose.connect('mongodb+srv://admin:km4ooDkp0wwvxKMM@cluster0.doqwc.mongodb.net/MelloDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//PASSPORT CONFIG

app.use(require("express-session")({
	secret: "This is my secret",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log(`Mello Server started on port ${port}`);
});