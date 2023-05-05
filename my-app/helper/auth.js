require("dotenv").config();
const axios = require("axios");

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
const scopes = process.env.scopes;
const redirect_uri = process.env.redirect_uri;

const installURL = (shop) => {
  try {
    // creating url for installing the application with required scopes.
    if (shop) {
      return encodeURI(
        `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${client_id}&scope=${scopes}&redirect_uri=${redirect_uri}`
      );
    } else {
      return res.status(400).send('Missing "Shop Name" parameter!!');
    }
  } catch (err) {
    console.error(err);
  }
};

const accessToken = async (code, shop) => {
  try {
    if (code && shop) {
      const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
      const { data } = await axios({
        url: accessTokenRequestUrl,
        method: "POST",
        data: {},
      });
      return data;
    } else {
      console.error("code or shop is undefined.");
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  installURL,
  accessToken,
};
