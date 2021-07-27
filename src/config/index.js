require('dotenv').config();

const express = require('express');
const app = express();
const expressSession = require('express-session');
const passport = require('passport');
const PORT = 3080;

const userModel = require('../api/models/userModel');


app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:'are bhai are bhai'
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(userModel.serializeUser());
  passport.deserializeUser(userModel.deserializeUser());



//database configuration
require('./database');

//bodyparser configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('cors')());

//routes configuration
app.use('/user', require('../api/routes/userRoutes'));

app.listen(PORT, console.log(`Server is Running at PORT ${PORT}`));