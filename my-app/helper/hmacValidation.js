const crypto = require("crypto");
require("dotenv").config();

const calculatedHmac = (data) => {
  const message = Object.keys(data)
    .filter((key) => key !== "hmac")
    .map((key) => `${key}=${data[key]}`)
    .sort()
    .join("&");

  const calculated_hmac = crypto
    .createHmac("sha256", process.env.client_secret)
    .update(message)
    .digest("hex");

  return calculated_hmac;
};

module.exports = {
  calculatedHmac,
};
