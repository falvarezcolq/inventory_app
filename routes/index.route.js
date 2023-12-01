const express = require("express");
const app = express();
const morgan = require("morgan");

// app.use(morgan("dev"));
app.use('/api/v1', require('./users'));
app.use('/api/v1', require('./products'));
// Add more routes here
// app.use('/api/v1', require('./orders'));
app.use('/api/v1', require('./categories'));


module.exports = app;