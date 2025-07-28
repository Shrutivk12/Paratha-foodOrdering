const express = require("express");
const cors = require("cors");
const {main, store, sessionOptions} = require("./config/db");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

//app config
const app = express();
const port = 8080;

//routers
const foodRouter = require("./routes/foodRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const cartRouter = require("./routes/cartRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");

//middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"], // React frontend origin
  credentials: true // Allow cookies to be sent
}));

//db connection
main()
.then((res) => {console.log("connected to db")})
.catch(err => console.log(err));


//session config
store.on("error", () =>{
  console.log("error in session store", err);
});

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
  usernameField: 'email'
},User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//add new food item
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));

//user
app.use("/user", userRouter);

//cart
app.use("/cart", cartRouter);

//orders
app.use("/order", orderRouter);

//scheduled jobs
require('./cronJobs/paymentReminder');

app.get("/", (req, res) => {
    res.send("app working");
})

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  
  res.status(status).json({
    success: false,
    message
  });
});

app.listen(port, () => {
    console.log(`server http://localhost:${port}`);
});

