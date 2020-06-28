const Order = require('../db/models/Order');
const Product = require('../db/models/Product');
const ServiceError = require('../util/serviceError');

exports.listOrders = async () => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

exports.createOrder = async ({ productId, quantity }) => {
  try {
    const product = await Product.findById(productId);
    if (product == null) throw new ServiceError({ message: 'product not found.', status: false });

    const order = new Order({
      quantity,
      product: productId,
    });
    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

exports.getOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    return order;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

exports.patchOrder = async ({ orderId, productId, quantity }) => {
  try {
    const order = await Order.findById(orderId);
    if (order == null) throw new ServiceError({ message: 'order not found.', status: false });

    if (productId != null) {
      const product = await Product.findById(productId);
      if (product == null) throw new ServiceError({ message: 'product not found.', status: false });
    }
    if (quantity != null) order.quantity = quantity;
    if (productId != null) order.product = productId;
    const updateOrder = await order.save();
    return updateOrder;
  } catch (error) {
    // console.log(`error :: ${error}`);
    throw new Error(error);
  }
};

exports.deleteOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (order == null)
      throw new ServiceError({ message: 'order not found.', status: false, StatusCode: 404 });
    const removedOrder = await order.remove();
    return removedOrder;
  } catch (error) {
    // console.log(`error :: ${error}`);
    throw new Error(error);
  }
};
