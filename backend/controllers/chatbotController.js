 const service = require('../services/chatbotService');

exports.getTopProducts = async (req, res) => {
  const result = await service.topSoldProducts();
  res.json(result);
};

exports.getOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);
  const result = await service.orderStatus(orderId);
  res.json(result);
};

exports.getRemainingStock = async (req, res) => {
  const { productName } = req.params;
  const result = await service.stockLeft(productName);
  res.json(result);
};
