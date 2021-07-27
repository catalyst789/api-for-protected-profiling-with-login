const router = require('express')();
const multer = require('multer');
const passport = require('passport');
const pl = require('passport-local');

const userModel = require('../models/userModel');

passport.use(new pl(userModel.authenticate()));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../../../uploads/images/')
    },
    filename: function (req, file, cb) {
      var date = new Date();
      var filekanaam = date.getTime() + file.originalname;
      cb(null, filekanaam)
    }
  })
  
  var upload = multer({ storage: storage })
  


/*Post Routes user Register*/
router.post('/reg', function(req, res){
    let newUser = new userModel({
      username:req.body.username,
    })
    userModel.register(newUser, req.body.password)
    .then(function(u){
      passport.authenticate('local')(req, res, function(){
        res.status(201).json({message: 'User Successfully Regsitered'});
      })
    })
    .catch(function(err){
      res.status(301).json(err);
    })
  })
  
  /*Post Routes user Login*/
  router.post('/login', passport.authenticate('local', {
  }), function(req, res, next){
      res.status(200).json({message: 'User Succesfully Logged In'});
  });
  
  /** GET Profile Page */
  router.get('/profile', isLoggedIn, function(req, res, next){
    userModel.findOne({username:req.session.passport.user})
  .then(function(userFound){
  res.status(200).json({message: 'This is your Profile', userFound});
  })
  })

  /** GET Logout User */
  router.get('/logout', function(req, res, next){
    req.logOut();
    res.json({message: 'Successfully Logged OUT ..!'})
  })

  /*Post Routes user's Profile Update*/
router.post('/updateProfile',isLoggedIn, function(req, res, next){
    let updatedDets = {
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      phoneNumber:req.body.phoneNumber,
      address:req.body.address,
      occupation:req.body.occupation,
    }
  
    userModel.findOneAndUpdate({username:req.session.passport.user}, updatedDets, {new:true})
    .then(function(updatedUser){
      res.status(200).json({message: 'Profile Updated', updatedUser});
    })
  })

  /** POST profile Pic Upload */
  router.post('/uploadpic', isLoggedIn, upload.single('profilepic'), function (req, res) {
    var addressOfImage = '../../../uploads/images/' + req.file.filename;
    userModel.findOne({ username: req.session.passport.user })
      .then(function (userFound) {
        userFound.profilepic = addressOfImage;
        userFound.save().then(function (uploadedpic) {
          res.status(201).json({message: 'Profile Pic uploaded', uploadedpic});
        })
      })
  });


  /** middleware for logged in Protected Routes */
  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next(); 
    }
    else{
      res.status(301).json('Kindly Logged In To Continue..!')
    }
  }



module.exports = router;