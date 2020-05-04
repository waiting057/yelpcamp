var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX -show all campgrounds
router.get("/",function(req,res){
	//Get all campgrounds from DB
	Campground.find({},function(err,allCampgrounds){
		if(err){
			req.flash("error","Something went wrong: "+err.message);
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
});
//CREATE - add new campground to DB
router.post("/",middleware.isLoggedIn,function(req,res){
	//get data from form
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	}
	var newCampground = {name:name,price:price,image:image,description:desc,author:author};
	//Create a new campground and save to DB
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			req.flash("error","Something went wrong: "+err.message);
			console.log(err);
		}else{
			//redirect back to camground page
			req.flash("success","Successfully to create a Post!");
			res.redirect("/campgrounds")
		}
	});
});
//NEW - show form to create new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
})

//SHOW - show more info about one campground
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			req.flash("error","Something went wrong: "+err.message);
			console.log(err);
		}else{
			res.render("campgrounds/show",{campground:foundCampground});
		}
	});
});
//EDIT campground route
router.get("/:id/edit",middleware.checkPostsOwnerShip,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			req.flash("error","Something went wrong: "+err.message);
			console.log(err);
		}else{
			res.render("campgrounds/edit",{campground:foundCampground});
		}
	});
	
});
//UPDATE campground route
router.put("/:id",middleware.checkPostsOwnerShip,function(req,res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updateCampground){
		if(err){
			req.flash("error","Something went wrong: "+err.message);
			res.redirect("/campgrounds");
		}else{
			//redirect somewhere(show page)
			req.flash("success","Successfully edit the post");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});	
});

//Destory campground route
router.delete("/:id",middleware.checkPostsOwnerShip,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			req.flash("error","Something went wrong: "+err.message);
			res.redirect("/campgrounds");
		}else{
			req.flash("success","Successfully delete the post");
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;