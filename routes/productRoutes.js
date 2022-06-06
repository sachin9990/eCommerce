const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProductDetails,
} = require("../controllers/productController");
const router = express.Router();

// End Point for get all Products
router.route("/getAllProducts").get(getAllProducts);
// End Point for new Product
router.route("/products/new").post(createProduct);
// End Point for updating Product, deleting product, getting the information of a single product.
router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getSingleProductDetails);

module.exports = router;
