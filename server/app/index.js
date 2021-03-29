const express = require('express');
const path = require('path');
const appRoutes = require('./routes');
const userRoutes = require('../user/routes');
const app = express();

var session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET || 'VBISecret',
    resave: false,
    cookie:{
      maxAge:Math.floor(1000*60*(Number(process.env.SESSION_EXPIRY_TIME_IN_MINS || 0.1)))
    },
    saveUninitialized: false
  }))

app.use(express.json());


app.use(userRoutes);
app.use(appRoutes);

module.exports = app;
