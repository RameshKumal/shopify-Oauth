const express = require("express");
const app = express();
const router = express.Router();
const { createCustomer, getCustomer, updateCustomer, deleteCustomer } = require("../controllers/customer");

// @api/shopify/
let routes = (app) => {
  router.post("/create", createCustomer);
  router.get("/get", getCustomer);
  router.put("/update/:id", updateCustomer);
  router.delete("/delete/:id", deleteCustomer);


  /*base routes */
  app.use('/api/shopify', router);
};

module.exports = routes;
