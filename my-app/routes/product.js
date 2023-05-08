const express = require("express");
const app = express();
const router = express.Router();
const { createProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/product");

// @api/shopify/
let routes = (app) => {
  router.post("/create", createProduct);
//   router.get("/get", );
//   router.put("/update/:id", );
//   router.delete("/delete/:id", );


  /*base routes */
  app.use('/api/shopify/product', router);
};

module.exports = routes;
