const upbhokta = require("../databaseSchemas/userSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsynchErrors");

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await upbhokta.create({
    name,
    email,
    password,
    avatar: { public_id: "This is a sample ID", url: "profilePicUrl" },
  });
  res.status(201).json({ success: true, user });
});
