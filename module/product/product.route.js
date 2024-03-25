const express = require("express");
const { productAddIntoDB, getProductFromDB, getFlashSaleFromDB, getTrendingProductFromDB, getTopCategoryIntoDB, getSingleProductFromDB } = require("./product.service");

const router = express.Router();

router.post('/product', productAddIntoDB);
router.get('/product', getProductFromDB);
router.get('/flash-Sale', getFlashSaleFromDB);
router.get("/trending", getTrendingProductFromDB);
router.get("/topCategory", getTopCategoryIntoDB);
router.get("/product/:id", getSingleProductFromDB);

module.exports = router;