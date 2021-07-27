const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

let userSchema = mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
    phoneNumber:Number,
    email:String,
    address:String,
    occupation:String,
    profilepic:String
});

userSchema.plugin(plm);


module.exports = mongoose.model('user', userSchema);