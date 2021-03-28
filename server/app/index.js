const express = require('express');
const path = require('path');
const appRoutes = require('./routes');
const songRoutes = require('../songs/routes/');
const app = express();

// app.use(express.static(path.resolve(__dirname,'../client/build', 'index.html')));

app.use(express.json())

app.use(songRoutes);
app.use(appRoutes);

module.exports = app;
