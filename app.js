// This file is express server file.
const express = require("express");
const app = express();
const middleWare = require("./middlewares/error");
app.use(express.json());

// Route Imports
const productRoute = require("./routes/productRoute");
app.use("/api/v1", productRoute);

// Middleware for Errors
app.use(middleWare);

module.exports = app;
