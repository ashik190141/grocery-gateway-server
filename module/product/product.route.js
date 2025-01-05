const express = require("express");
const { addUserIntoDB, loginUser } = require("../auth/auth.service");

const { cartAddIntoDB, getCartFromDB, updateCart } = require("../cart/cart.service");

const { orderAddIntoDB, getUserOrderProductFromDB, getAllOrderProductFromDB, updateOrderProductStatusIntoDB } = require("../order/order.service");

const { reviewAddIntoDB, getReviewFromDB } = require("../review/review.service");

const { productAddIntoDB, getProductFromDB, getFlashSaleFromDB, getTrendingProductFromDB, getTopCategoryIntoDB, getSingleProductFromDB, deleteProductIntoDB, updateProductIntoDB } = require("./product.service");


const router = express.Router();

router.post('/product', productAddIntoDB);
router.get('/product', getProductFromDB);
router.get('/flash-Sale', getFlashSaleFromDB);
router.get("/trending", getTrendingProductFromDB);
router.get("/topCategory", getTopCategoryIntoDB);
router.get("/product/:id", getSingleProductFromDB);
router.delete("/product/:id", deleteProductIntoDB);
router.put("/product/:id", updateProductIntoDB);

router.post("/register", addUserIntoDB);
router.post("/login", loginUser);

router.put("/addToCart", cartAddIntoDB);
router.get("/addToCart/:email", getCartFromDB);
router.put("/addToCart/:id", updateCart);

router.post("/review", reviewAddIntoDB);
router.get("/review/:id", getReviewFromDB);

router.post("/order", orderAddIntoDB)
router.get("/order/:email", getUserOrderProductFromDB);
router.get("/order", getAllOrderProductFromDB);
router.put("/delivered/:id", updateOrderProductStatusIntoDB);

module.exports = router;