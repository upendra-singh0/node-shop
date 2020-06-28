const express = require('express');
const authenticateUser = require('../common/authenticate');
const orderController = require('../controllers/orderController');
const processRequest = require('../util/processRequest');

const router = express.Router();

router.get('/', authenticateUser, async (req, res) => {
  try {
    const orders = await orderController.listOrders();
    res.json(orders);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post('/', authenticateUser, async (req, res) => {
  try {
    const { data } = processRequest(req);
    const { productId, quantity } = data;
    const savedOrder = await orderController.createOrder({
      productId,
      quantity,
    });
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:orderId', authenticateUser, async (req, res) => {
  try {
    const { pathParams } = processRequest(req);
    const { orderId } = pathParams;

    const order = await orderController.getOrder({ orderId });
    if (order == null) res.status(404).json({ message: 'order not found' });
    else res.json(order);
  } catch (error) {
    // console.log(`error :: ${error}`);
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:orderId', authenticateUser, async (req, res) => {
  try {
    const { data, pathParams } = processRequest(req);
    const { productId, quantity } = data;
    const { orderId } = pathParams;

    const updatedOrder = await orderController.patchOrder({
      orderId,
      productId,
      quantity,
    });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:orderId', authenticateUser, async (req, res) => {
  try {
    const { pathParams } = processRequest(req);
    const { orderId } = pathParams;

    const deletedOrder = await orderController.deleteOrder(orderId);
    res.json(deletedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
