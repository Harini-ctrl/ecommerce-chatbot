 const express = require('express');
const router = express.Router();
const { getTopProducts, getOrderStatus, getRemainingStock } = require('../controllers/chatbotController');

router.get('/top-products', getTopProducts);
router.get('/order-status/:orderId', getOrderStatus);
router.get('/stock/:productName', getRemainingStock);

module.exports = router;
