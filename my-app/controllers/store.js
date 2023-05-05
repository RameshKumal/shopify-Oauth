const { calculatedHmac } = require("../helper/hmacValidation");
const { authorize, redirect } = require("../helper/auth");
const axios = require("axios");
const db = require("../db/index");
const Store = db.store;
const shop = process.env.shop_name;

const auth = async (req, res) => {
  const link = await authorize(req.query.shop);

  return res.redirect(link);
};

const forward = async (req, res) => {
  try {
    const shopUrl = `https://${shop}.myshopify.com/admin/api/2023-04/shop.json`;
    const hmac = req.query.hmac;
    const calcHmac = calculatedHmac(req.query);

    if (hmac === calcHmac) {
      const code = await redirect(req.query.code, req.query.shop);
      console.log(code);

      let token = code.access_token;
      const storeData = await axios.get(shopUrl, {
        headers: {
          "X-Shopify-Access-Token": `${token}`,
        },
      });
      console.log(storeData);
      // const store = await Store.create({
      //   store_id,
      //   store_owner,
      //   owner_email,
      //   store_name,
      //   address,
      //   phone,
      //   access_token,
      // });}
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  auth,
  forward,
};
