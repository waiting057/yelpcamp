var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//comment new
router.get("/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			req.flash("error","Something went wrong: "+err.message);
			console.log(err);
		}else{
			res.render("comments/new",{campground:campground});
		}
	});
});
//comment create
router.post("/",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			req.flash("error","Something went wrong: "+err.message);
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					req.flash("error","Something went wrong: "+err.message);
					console.log(err);
				}else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Successfully to create comment!");
					res.redirect("/campgrounds/"+campground._id)
				}
			});
		}
	});
});
//COMMENT edit route
router.get("/:comment_id/edit",middleware.checkCommentOwnerShip,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			req.flash("error","Something went wrong: "+err.message);
			res.redirect("back");
		}else{
			req.flash("success","Successfully edit the comment");
			res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
		}
	});
});
//COMMENT update route
router.put("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			req.flash("error","Something went wrong: "+err.message);
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
//COMMENT destory route
router.delete("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			req.flash("error","Something went wrong: "+err.message);
			res.redirect("back");
		}else{
			req.flash("success","Successfully to delete the comment!");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

module.exports = router;