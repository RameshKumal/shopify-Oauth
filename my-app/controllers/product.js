const db = require("../db/index");
const axios = require("axios");
require("dotenv").config();
const Store = db.store;
const Product = db.product;
const Variant = db.productVariant;
const Option = db.productOption;
const shop = process.env.shop_name;

const createProduct = async (req, res) => {
  try {
    // /admin/api/2023-04/customers.json
    const productData = req.body;
    const productUrl = `https://${shop}.myshopify.com/admin/api/2023-04/products.json`;

    const store = await Store.findAll();

    const StoreName = store[0].dataValues.store_domain.split(".")[0];

    if (shop === StoreName) {
      const token = store[0].dataValues.access_token;

      const { data } = await axios.post(productUrl, productData, {
        headers: {
          "X-Shopify-Access-Token": token,
          "Content-type": "application/json",
        },
      });
      const product = data.product;
      const variant = data.product.variants[0];
      const option = data.product.options[0];

      //   const address = data.customer.default_address;

      await Product.create({
        id: product.id,
        title: product.title,
        body_html: product.body_html,
        vendor: product.vendor,
        product_type: product.product_type,
        handle: product.handle,
        status: product.status,
      });

      await Variant.create({
        id: variant.id,
        product_id: variant.product_id,
        title: variant.title,
        price: variant.price,
        sku: variant.sku,
        fulfillment_service: variant.fulfillment_service,
      });

      await Option.create({
        id: option.id,
        product_id: option.product_id,
        name: option.name,
        position: option.position,
      });

      res.status(200).json({ message: "Done", data });
    } else {
      console.error("Shop doesn't exist");
    }
  } catch (err) {
    console.log(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const store = await Store.findAll();
    const token = store[0].dataValues.access_token;

    const productUrl = `https://${shop}.myshopify.com/admin/api/2023-04/products.json`;
    const { data } = await axios.get(productUrl, {
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-type": "application/json",
      },
    });

    res.status(201).json(data);
  } catch (err) {
    console.error(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    // /admin/api/2023-04/customers/207119551.json
    const id = req.params.id;
    const productData = req.body;

    const store = await Store.findAll();

    const StoreName = store[0].dataValues.store_domain.split(".")[0];

    if (shop === StoreName) {
      const token = store[0].dataValues.access_token;

      const productUrl = `https://${shop}.myshopify.com/admin/api/2023-04/products/${id}.json`;
      const { data } = await axios.put(productUrl, productData, {
        headers: {
          "X-Shopify-Access-Token": token,
          "Content-Type": "application/json",
        },
      });
      res.status(200).json({"updated":data});
    } else {
      res.status(404).json({ error: "Error in updating the content." });
    }
  } catch (err) {
    console.error(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    // /admin/api/2023-04/customers/207119551.json
    const id = req.params.id;

    const store = await Store.findAll();

    const StoreName = store[0].dataValues.store_domain.split(".")[0];

    if (shop === StoreName) {
      const token = store[0].dataValues.access_token;

      const productUrl = `https://${shop}.myshopify.com/admin/api/2023-04/products/${id}.json`;
      const { data } = await axios.delete(productUrl, {
        headers: {
          "X-Shopify-Access-Token": token,
          "Content-type": "application/json",
        },
      });
      res.status(200).json({"deleted":data});
    } else {
      res.status(404).json({ error: "Error in deleting the content." });
    }
  } catch (err) {}
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
