 const { loadCSV } = require('../utils/csvLoader');

let products, orders, orderItems, inventoryItems;

async function loadData() {
  if (!products) products = await loadCSV('products.csv');
  if (!orders) orders = await loadCSV('orders.csv');
  if (!orderItems) orderItems = await loadCSV('order_items.csv');
  if (!inventoryItems) inventoryItems = await loadCSV('inventory_items.csv');
}

// "Top 5 most sold products"
exports.topSoldProducts = async () => {
  await loadData();
  const salesMap = {};

  orderItems.forEach(item => {
    const productId = item.product_id;
    salesMap[productId] = (salesMap[productId] || 0) + parseInt(item.quantity);
  });

  const sorted = Object.entries(salesMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return sorted.map(([id, qty]) => {
    const product = products.find(p => p.id === id);
    return {
      product_id: id,
      name: product?.name || 'Unknown',
     
    };
  });
};

// "Status of order ID 12345"
exports.orderStatus = async (orderId) => {
  await loadData();

  const order = orders.find(o => o.order_id === orderId);

  return order ? { order_id: orderId, status: order.status } : { error: 'Order not found' };
};

// "How many <productName> are left in stock?"
exports.stockLeft = async (productName) => {
  await loadData();

  // Match case-insensitively on product_name from inventory_items
  const matchedItems = inventoryItems.filter(item =>
    item.product_name &&
    item.product_name.toLowerCase().includes(productName.toLowerCase())
  );

  if (matchedItems.length === 0) {
    return { error: 'Product not found' };
  }

  const remaining = matchedItems.filter(item => item.sold_at.trim() === '');
console.log(remaining);
  return {
    product_name: matchedItems[0].product_name,
    product_id: matchedItems[0].product_id,
    remaining_stock: remaining.length
  };
};
