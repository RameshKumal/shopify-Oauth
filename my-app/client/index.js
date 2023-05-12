require("dotenv").config();
require("@shopify/shopify-api/adapters/node");
const { shopifyApi, Session } = require("@shopify/shopify-api");

const Shopify = shopifyApi({
  apiKey: process.env.client_id,
  apiSecretKey: process.env.client_secret,
  scopes: process.env.scopes,
  hostName: "https://0e3c-2401-4900-1f3f-b3ce-3c36-7588-3f72-fbc3.ngrok-free.app",
});

const shopifyRestClient = async (shop, token) => {
    let session = new Session({
        accessToken: token, 
        shop: shop,
        id: Shopify.auth.nonce(),
        state: Shopify.auth.nonce()
    });

    let client = new Shopify.clients.Rest({session: session});
    return client;
}

module.exports = {shopifyRestClient}

