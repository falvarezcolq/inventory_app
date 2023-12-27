const express = require("express");
const app = express();
const morgan = require("morgan");

// app.use(morgan("dev"));
app.use('/api/v1', require('./users'));
app.use('/api/v1', require('./units'));
app.use('/api/v1', require('./products'));
app.use('/api/v1', require('./product_images'));
app.use('/api/v1', require('./roles'));
app.use('/api/v1', require('./categories'));
app.use('/api/v1', require('./suppliers'));
app.use('/api/v1',require('./login'));
app.use('/api/v1',require('./userinfo'));  
app.use('/api/v1',require('./inventory_movements')); 
app.use('/api/v1',require('./orders'));
app.use('/api/v1',require('./reports'));




module.exports = app;