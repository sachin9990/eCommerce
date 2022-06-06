// This file is express server file.
const express = require("express");
const app = express();
const errorMiddleWare = require("./middlewares/error");
app.use(express.json());

// Route Imports
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);

// Middleware for Errors
app.use(errorMiddleWare);

module.exports = app;
