// Importing the express server
const app = require("./app");
const dotEnv = require("dotenv");
const connectToMongo = require("./config/database");

// Handling Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server because of Uncaught Exceptions`);
  process.exit(1);
});

// Config env
dotEnv.config({ path: "./config/config.env" });

// Make sure that the database function is called after the dotEnv.config line nai toh use dotEnv file nai milegi
connectToMongo();

// Listening at a PORT
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
// Can't change the "unhandledRejection" word.
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(
    `Shutting down the server because of Unhandled Promise Rejection`
  );

  // Closing the server
  server.close(() => {
    process.exit(1);
  });
});
