var Campground =require("../models/campground");
var Comment = require("../models/comment");
//all middleware go here
var middlewareObj={};

middlewareObj.checkPostsOwnerShip = function(req,res,next){
	//is user login?
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
				req.flash("error","Something went wrong: "+err.message);
				res.redirect("back");
			}else{
				//does user own the campground?
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","Permission denied!");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","You need to login to do that!");
		res.redirect("back");
	}
}
middlewareObj.checkCommentOwnerShip = function(req,res,next){
	//is user login?
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				req.flash("error","Something went wrong: "+err.message);
				res.redirect("back");
			}else{
				//does user own the campground?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","Permission denied!");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","You need to login to do that!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to login to do that!");
	res.redirect("/login");
}

module.exports = middlewareObj;