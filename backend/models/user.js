const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phoneNo:{
        type: String,
        required: true,
    },
    cartData:{
        type: Object,
        default: {}
    }
}, {minimize: false})

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    passwordValidator: function (password, cb) {
        if (password.length < 8) {
            return cb("Password must be at least 8 characters long.");
        }
        return cb(); // no error
    },
    errorMessages: {
    UserExistsError: 'A user with this email is already registered.',
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;