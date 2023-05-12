const { calculatedHmac } = require("../helper/hmacValidation");
const { installURL, accessToken } = require("../helper/auth");
const axios = require("axios");
const db = require("../db/index");
// const { createSessionToken } = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const Store = db.store;
const shop = process.env.shop_name;

const authorization = async (req, res) => {
  const link = await installURL(req.query.shop);

  return res.redirect(link); //redirected to the installing store.
};

const accessShopData = async (req, res, next) => {
  try {
    /*here we will get the hmac, code, shopdomain, state and timeStamp */
    const shopUrl = `https://${shop}.myshopify.com/admin/api/2023-04/shop.json`;
    const hmac = req.query.hmac;
    const calcHmac = calculatedHmac(req.query);

    if (hmac === calcHmac) {
      const code = await accessToken(req.query.code, req.query.shop);

      let token = code.access_token;
      const { data } = await axios.get(shopUrl, {
        headers: {
          "X-Shopify-Access-Token": `${token}`,
        },
      });
      const { shop } = data;
      const dbStore = await Store.findOne({
        where: {
          store_domain: shop.domain,
        },
      });

      
      if (!dbStore) {
        const store = await Store.create({
          store_id: shop.id,
          store_owner: shop.shop_owner,
          owner_email: shop.email,
          store_domain: shop.domain,
          country: shop.country_name,
          phone: shop.phone,
          access_token: token,
        });

        createSessionToken(shop.domain);
        // if (store) {
        //   res.send("Store information is Added!");
        // } else {
        //   res.send("There was a error while inserting the data in database.");
        // }
      } else {
        const store = await Store.update(
          {
            store_id: shop.id,
            store_owner: shop.shop_owner,
            owner_email: shop.email,
            store_domain: shop.domain,
            country: shop.country_name,
            phone: shop.phone,
            access_token: token,
          },
          { where: { store_id: shop.id } }
        );

        res.send("store updated successfully!");
        next();
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  authorization,
  accessShopData,
};
