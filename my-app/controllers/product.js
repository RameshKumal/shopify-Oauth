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
    const customerData = req.body;
    const consumerUrl = `https://${shop}.myshopify.com/admin/api/2023-04/products.json`;

    const store = await Store.findAll();

    const StoreName = store[0].dataValues.store_domain.split(".")[0];

    if (shop === StoreName) {
      const token = store[0].dataValues.access_token;

      const { data } = await axios.post(consumerUrl, customerData, {
        headers: {
          "X-Shopify-Access-Token": token,
          "Content-type": "application/json",
        },
      });

      console.log(data);
            
    //   const address = data.customer.default_address;

    //   await Product.create({
    //     id: product.id,
    //     title: product.title,
    //     body_html: product.body_html,
    //     vendor: product.vendor,
    //     product_type: product.product_type,
    //     handle: product.handle,
    //     status : product.status,
    //   });

    //   await Variant.create({
    //     id: address.id,
    //     customer_id: address.customer_id,
    //     company: address.company,
    //     address1: address.address1,
    //     address2: address.address2,
    //     city: address.city,
    //     country: address.country,
    //   });

    //   await Option.create({
    //     id: address.id,
    //     customer_id: address.customer_id,
    //     company: address.company,
    //     address1: address.address1,
    //     address2: address.address2,
    //     city: address.city,
    //     country: address.country,
    //   });

    //   res.status(200).json({ message: "Done", data });
    }

    // console.log(store);
  } catch (err) {
    console.log(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const store = await Store.findAll();
    const token = store[0].dataValues.access_token;

    const consumerUrl = `https://${shop}.myshopify.com/admin/api/2023-04/products.json`;
    const { data } = await axios.get(consumerUrl, {
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
    const customerData = req.body;

    const store = await Store.findAll();

    const StoreName = store[0].dataValues.store_domain.split(".")[0];

    if (shop === StoreName) {
      const token = store[0].dataValues.access_token;

      const consumerUrl = `https://${shop}.myshopify.com/admin/api/2023-04/products/${id}.json`;
      const { data } = await axios.put(consumerUrl, customerData, {
        headers: {
          "X-Shopify-Access-Token": token,
          "Content-type": "application/json",
        },
      });
      res.status(200).json(data);
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

      const consumerUrl = `https://${shop}.myshopify.com/admin/api/2023-04/products/${id}.json`;
      const { data } = await axios.delete(consumerUrl, {
        headers: {
          "X-Shopify-Access-Token": token,
          "Content-type": "application/json",
        },
      });
      res.status(200).json(data);
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
