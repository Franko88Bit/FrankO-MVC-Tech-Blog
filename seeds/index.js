const sequelize = require("../config/connection")
const {User,Blog,Comment} = require("../models")

const users = [
    {
        username: "Tommy",
        password: "Tommypassword"
    },
    {
        username: "Pauly",
        password: "Paulypassword"
    },
    {
        username: "Maria",
        password: "Mariapassword"
    },
]

const blogs = [
    {
        title: "My very first post",
        content: "Bark",
        userId: 1

    },
    {
        title: "My second post",
        content: "Growl",
        userId: 1
    },
    {
        title: "Pauly's first post",
        content: "Sup im Pauly",
        userId: 2
    },
    {
        title: "Marias first post",
        content: "Sup im Maria",
        userId: 3
    },
]

const comments = [
    {
        body: "Nice post!!!",
        blogId: 1,
        userId: 1
    },
    {
        body: "I concur",
        blogId: 3,
        userId: 2
    },
    {
        body: "for sure!",
        blogId: 4,
        userId: 1
    },
    {
        body: "See you later!",
        blogId: 2,
        userId: 3
    },
]

const plantSeeds = async () =>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

plantSeeds()