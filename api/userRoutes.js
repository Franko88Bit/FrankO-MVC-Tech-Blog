const express = require("express");
const router = express.Router();
const {User, Blog, Comment} = require("../../models");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
    User.findAll({
      include:[Blog, Comment]
    })
      .then(dbUsers => {
        res.json(dbUsers);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "An error happened", err });
      });
});

// Logs out by hitting /api/users/logout
router.get('/:id', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})    

router.get("/:id", (req, res) => {    
   User.findByPk(req.params.id,{include:[Blog, Comment]})
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "An error happened", err });
      });  
});

// Signs up api/users
router.post("/", (req, res) => {
// Runs hooks to hash and salt password; create user
    User.create(req.body, {individualHooks: true} )
    .then(newUser => {
// Logs in Immediately = create new session for user with id and username 
      req.session.user = {
        id:newUser.id,
        username:newUser.username
      }        
      res.json(newUser);
    })    
    .catch(err => {
        console.log(err);
        res.status(500).jsoin({ msg: "An error happened", err });
    });
});

// login api/users/login
router.post("/login", (req, res) => {
// Finds username that matches the request
    User.findOne({
        where:{
        username:req.body.username
    }
}).then(foundUser=>{
// if username is not found, send a message
     if(!foundUser){
        return res.status(400).json({msg:"Wrong login credentials"})
     }    
// Compares the password with saved hash
     if(bcrypt.compareSync(req.body.password,foundUser.password)){
// If password matches, create a session for user
       req.session.user = {
        id:foundUser.id,
        username:foundUser.username
       }
       return res.json(foundUser)
// Page redirects??                      
      } else {
        return res.status(400).json({msg: "wrong login credentials"})
      }     
   }).catch(err => {
       console.log(err);
       res.status(500).json({ msg: "An error happened", err });
   });    
});

router.put("/:id", (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        },
        individualHooks: true
    }).then(updatedUser => {
        res.json(updatedUser);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "An error happened", err });
    });
});

router.delete("/:id", (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    }).then(delUser => {
      res.json(delUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error happened", err });
    });
  });

module.exports = router;