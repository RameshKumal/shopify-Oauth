const express = require("express");
const app = express();
const router = express.Router();
const { authorization, accessShopData } = require("../controllers/store");

// @api/shopify/
let routes = (app) => {
  router.get("/authorize", authorization);
  router.get("/redirect", accessShopData);

  /*base routes */
  app.use('/api/shopify', router);
};

module.exports = routes;
