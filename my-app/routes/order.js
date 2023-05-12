const express = require("express");
const app = express();
const router = express.Router();
const { createOrder, getOrder } = require("../controllers/order");

let routes = (app) => {
  router.post("/create", createOrder);
  router.get("/get", getOrder);

  app.use("/api/shopify/order", router);
};

module.exports = routes;
