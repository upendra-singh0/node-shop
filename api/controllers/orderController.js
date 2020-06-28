const orderService = require('../services/orderService');

exports.listOrders = async () => {
  try {
    const orders = await orderService.listOrders();
    return orders;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

exports.getOrder = async ({ orderId }) => {
  try {
    const order = await orderService.getOrder(orderId);
    return order;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

exports.createOrder = async ({ productId, quantity }) => {
  try {
    const order = await orderService.createOrder({
      productId,
      quantity,
    });
    return order;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

exports.patchOrder = async ({ orderId, productId, quantity }) => {
  try {
    const updateOrder = await orderService.patchOrder({
      orderId,
      productId,
      quantity,
    });
    return updateOrder;
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteOrder = async (orderId) => {
  try {
    const removedOrder = await orderService.deleteOrder(orderId);
    return removedOrder;
  } catch (error) {
    throw new Error(error);
  }
};
