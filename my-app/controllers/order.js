require("dotenv").config();
const { shopifyRestClient } = require("../client/index");
const axios = require("axios");
const db = require("../db/index");
const { DataType } = require("@shopify/shopify-api");
const Store = db.store;
const Order = db.order;
const shop = process.env.shop_name;

const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    // console.log(orderData);
    // const orderUrl = `https://${shop}.myshopify.com/admin/api/2023-04/orders.json`;
    const store = await Store.findAll();

    const StoreName = store[0].dataValues.store_domain;

    if (StoreName) {
      const token = store[0].dataValues.access_token;

      let shopify = await shopifyRestClient(StoreName, token);

      const orders = await shopify.post({
        path: "orders",
        data: req.body,
        type: DataType.JSON,
      });
      res.json({ "orderes created:": orders });
    }
  } catch (err) {
    console.error(err);
  }
};

const getOrder = async (req, res) => {
  try {
    const store = await Store.findAll();

    const StoreName = store[0].dataValues.store_domain;
    const token = store[0].dataValues.access_token;

    let shopify = await shopifyRestClient(StoreName, token);

    const orders = await shopify.get({ path: "orders" });

    res.status(200).json({ "orders list": orders.body.orders });
  } catch (err) {
    console.log("error", err);
  }
};

module.exports = { createOrder, getOrder };
