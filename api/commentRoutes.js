const express = require("express");
const router = express.Router();
const {User, Blog, Comment} = require("../../models");

router.get("/", (req, res) => {
    Comment.findAll({include:[User, Blog]})
    .then(dbComments => {
        res.json(dbComments);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "An error happened", err});
    });
});

router.get("/:id", (req, res) => {
    Comment.findByPk(req.params.id,{include:[User, Blog]})
    .then(dbComment => {
        res.json(dbComment);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "An error happened!", err });
    });
});

router.post("/", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg:"Login first please!"})
   }
    Comment.create({
        body:req.body.body,
        userId:req.session.user.id,
        blogId:req.body.blogId
    })
     .then(newComment => {
        res.json(newComment);
     })
     .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "An error happened", err });
     });
});

router.put("/:id", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg:"Login first please!"})
    }
// Makes sure user that is updating is original author

   Comment.update(req.body, {
    Where: {
        id: req.params.id
    }
   }).then(updatedComment => {
    res.json(updatedComment);
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({ msg: 'An error happened', err });
   });
});

router.delete("/:id", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg:'Login first please!'})
    }
// Makes sure user that is deleting is original author
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(delComment => {
        res.json(delComment);
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "An error happened", err });
    });  
});

module.exports = router;

