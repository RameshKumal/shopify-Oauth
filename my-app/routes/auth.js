const express = require("express");
const router = express.Router();
const { auth, forward } = require("../controllers/store");

// @api/shopify/

router.get("/authorize", auth);
router.get("/redirect", forward);

module.exports = router;
