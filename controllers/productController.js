const vastu = require("../databaseSchemas/productSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsynchErrors");
const ApiFeatures = require("../utils/apiFeatures");

// 1. Create Product -- ADMIN
exports.createProduct = catchAsyncErrors(async (req, res) => {
  const product = await vastu.create(req.body);
  res.status(201).json({ success: true, product });
});

// 2. Get all Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await vastu.countDocuments();
  // ApiFeatures takes two arguments query and queryStr
  const apiFeatures = new ApiFeatures(vastu.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  // const allProducts = await vastu.find();
  const allProducts = await apiFeatures.query;
  // It is a normal function
  res.status(200).json({ success: true, allProducts, productCount });
});

// 3. Get single Product details
exports.getSingleProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await vastu.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({ success: true, product });
});

// 4. Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  // let is used because it will be changed
  let product = await vastu.findByIdAndUpdate(req.params.id);
  // If the asked product is not there
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  product = await vastu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
});

// 5. Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await vastu.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Deleted successfully",
  });
});
