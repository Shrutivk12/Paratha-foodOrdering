if(process.env.Node_ENV != "production"){
  require("dotenv").config();
}
const mongoose = require("mongoose");
const dbUrl = process.env.ATLAS_URL;
const session = require('express-session');
const MongoStore = require('connect-mongo');
async function main() {
  await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret : process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};

module.exports = {main, store, sessionOptions};