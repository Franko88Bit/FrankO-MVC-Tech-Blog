const express = require("express");
const exphbs = require("express-handlebars");
const allRoutes = require("./controllers");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const mysql = require('mysql2');
require('dotenv').config();
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'franko_tech_blog_db',
        port:8889
        
    }
)

const app = express();
const PORT = process.env.PORT || 8889;

const { User, Blog, Comment } = require("../models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const sess = {
    secret: process.env.DB_SESSION_SECRET,
    cookie: {

        maxAge: 0.5 * 60 * 60 * 1000
    },

    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.static('public'));

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use("/", allRoutes);

sequelize.sync({ focus: false }).then(function() {
    app.listen(PORT, function() {
        console.log("APP listening on PORT " + PORT);
    });
});

