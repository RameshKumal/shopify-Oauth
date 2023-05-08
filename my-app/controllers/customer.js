const db = require("../db/index");
const axios = require("axios");
require("dotenv").config();
const Customer = db.customer;
const customerAddress = db.customer_address;
const Store = db.store;
const shop = process.env.shop_name;

const createCustomer = async (req, res) => {
  try {
    // /admin/api/2023-04/customers.json
    const customerData = req.body;
    const consumerUrl = `https://${shop}.myshopify.com/admin/api/2023-04/customers.json`;

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

      const customer = data.customer;
      const address = data.customer.default_address;

      await Customer.create({
        id: customer.id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        currency: customer.currency,
      });

      await customerAddress.create({
        id: address.id,
        customer_id: address.customer_id,
        company: address.company,
        address1: address.address1,
        address2: address.address2,
        city: address.city,
        country: address.country,
      });

      res.status(200).json({ message: "Done", data });
    }

    // console.log(store);
  } catch (err) {
    console.log(err);
  }
};

const getCustomer = async (req, res) => {
  try {
    const store = await Store.findAll();
    const token = store[0].dataValues.access_token;

    const consumerUrl = `https://${shop}.myshopify.com/admin/api/2023-04/customers.json`;
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

const updateCustomer = async (req, res) => {
  try {
    // /admin/api/2023-04/customers/207119551.json
    const id = req.params.id;
    const customerData = req.body;

    const store = await Store.findAll();

    const StoreName = store[0].dataValues.store_domain.split(".")[0];

    if (shop === StoreName) {
      const token = store[0].dataValues.access_token;

      const consumerUrl = `https://${shop}.myshopify.com/admin/api/2023-04/customers/${id}.json`;
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

const deleteCustomer = async (req, res) => {
  try {
    // /admin/api/2023-04/customers/207119551.json
    const id = req.params.id;

    const store = await Store.findAll();

    const StoreName = store[0].dataValues.store_domain.split(".")[0];

    if (shop === StoreName) {
      const token = store[0].dataValues.access_token;

      const consumerUrl = `https://${shop}.myshopify.com/admin/api/2023-04/customers/${id}.json`;
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
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
