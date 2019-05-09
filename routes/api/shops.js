const express = require("express");
const router = express.Router();
const ShopController = require("../controllers/shops");

router.post("/", ShopController.register);
router.get("/", ShopController.shop_get_all);
router.get("/:shopId", ShopController.shop_get);
router.get("/search/:shopname", ShopController.shop_get_search);

module.exports = router;