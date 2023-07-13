const express = require("express");
const router = express.Router();
const {User, Blog , Comment} = require("../..models");
const withAuth = require('../../util.auth.js')

// gets all blogs and users/comments

router.get("/", (req,res) => {
    Blog.findAll({include:[User, Comment]})
    .then(dbBlogs => {
        res.json(dbBlogs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
    });
});

// get only one blog with user and comment

router.get("/:id", (req, res) => {
    Blog.findBYPK(req.params.id,{include:[User, Comment]})
    .then(dbBlog => {
        res.json(dbBlog);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error happened", err});
    });
});

// creates a new blog post
router.post("/", (req, res) => {
// Checks for user that logged in
// If no user, sends message
   if(!req.session.user){
    return res.status(401).json({msg:"Login please!"})
   }    
// creates blog post with title and content input by user; user id from session data
   Blog.create({
    title:req.body.title,
    content:req.body.content,
    userId:req.session.user.id
   })
// data is created
    .then(newBlog => {
        res.json(newBlog);
    })      
    .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "An error happened" });
    });
});

// Post updates - withAuth fx
router.put("/:id", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg:"Login please!"})
    }
    Blog.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(updatedBlog => {
        res.json(updatedBlog);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "An error happened", err });
    });
});

router.delete("/:id", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg:"Login please!"})
    }
    Blog.destroy({
        where: {
            id: req.params.id
        }
    }).then(delBlog => {
        res.json(delBlog);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg:"An error happened!", err });
    });
});

module.exports = router;