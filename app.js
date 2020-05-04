var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	flash = require("connect-flash"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	passportLocalMongoose = require("passport-local-mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User =require("./models/user"),
	seedDB = require("./seeds");
//requiring routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");


mongoose.connect('mongodb+srv://mongo:mongo@cluster0-yyds6.mongodb.net/test?retryWrites=true&w=majority',{
	userNewUrlParser:true,
	useCreateIndex:true
}).then(()=>{
	console.log('Connect to DB');
}).catch(err =>{
	console.log('ERROR:',err.message);
});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seed the database

//PASSPORT config
app.use(require("express-session")({
	secret:"secret setting up~~~",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//send all page with req.user
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(process.env.PORT || 3000, process.env.IP,function(){
		   console.log("YelpCamp Server start.");
});
