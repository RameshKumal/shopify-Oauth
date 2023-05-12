const express = require("express");
const app = express();
const router = express.Router();
const { authorization, accessShopData } = require("../controllers/store");
// const {verifySessionToken} = require("../middleware/auth.middleware")
// const { createCustomer, getCustomer, updateCustomer, deleteCustomer } = require("../controllers/customer");

// @api/shopify/
let routes = (app) => {
  router.get("/authorize", authorization);
  /*after the authorize process shopify generate the "authorization_code" if merchants agree with scope */
  router.get("/redirect", accessShopData );

  /*base routes */
  app.use("/api/shopify", router);
};

module.exports = routes;
