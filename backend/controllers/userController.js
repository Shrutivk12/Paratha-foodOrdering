const User = require("../models/user.js");

module.exports.signup = async (req, res) => {
  const { username, email, password, phoneNo } = req.body;
  try{
    const newUser = new User({ username, email, phoneNo });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err){
          return res.status(500).json({ success: false, message: err.message });
      }
      res.json({ 
        success: true,
        message: "User registered",
        user: {
          _id: registeredUser._id,
          username: registeredUser.username,
          email: registeredUser.email,
          phoneNo: registeredUser.phoneNo,
          cartData: registeredUser.cartData,
        }, 
      });
    });
  }catch(error){
    res.status(400).json({ 
      success: false, 
      message: error.message || error || "Registration failed", 
    });
  }
};

module.exports.login = (req, res) => {
  res.json({ 
    success: true, 
    message: "User logged in", 
    user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      phoneNo: req.user.phoneNo,
      cartData: req.user.cartData,
    },  
  });
};

module.exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ success: true, message: "Logged out" });
  });
};