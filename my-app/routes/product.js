const express = require("express");
const app = express();
const router = express.Router();
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
// const {verifySessionToken} = require("../middleware/auth.middleware")

// @api/shopify/
let routes = (app) => {
  router.post("/create", createProduct);
  router.get("/get", getProduct);
  router.put("/update/:id", updateProduct);
  router.delete("/delete/:id", deleteProduct);

  /*base routes */
  app.use("/api/shopify/product", router);
};

module.exports = routes;
