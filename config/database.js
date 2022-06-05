const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose
    .connect(process.env.MongoDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((e) => {
      console.log(`MongoDB connected with server: ${e.connection.host}`);
    });
  // Not writing the .catch block error because it is now being handled at the Unhandled Promise Rejection part.
  // .catch((err) => {
  //   console.log(err);
  // });
};

module.exports = connectToMongo;
