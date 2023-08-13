const { User } = require("../models");

const userData = [
  {
    username: "Tommy",
    password: "tommy",
  },
  {
    username: "Pauly",
    password: "pauly",
  },
  {
    username: "Tony",
    password: "tony",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
