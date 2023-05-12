const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

const verifySessionToken = (req, res, next) => {
  try {


    jwt.verify(token, process.env.JWT_SECRET, (err, valid) => {
      if (err) {
        res.status(401).json({ result: "please provide the valid token" });
      } else {
        console.log("oh yes verified");
      }
    });
  } catch (err) {
    console.log("error: ", err);
  }
};

module.exports = { verifySessionToken };
