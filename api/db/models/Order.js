const mongoose = require('mongoose');
const Product = require('./Product');

const OrderSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Product,
    reuired: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});
//* modal name , schema
module.exports = mongoose.model('Order', OrderSchema, 'orders');
