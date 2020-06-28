const Product = require('../db/models/Product');
const ServiceError = require('../util/serviceError');

exports.listProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

exports.getProduct = async (productId) => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

exports.createProduct = async ({ name, price, productImage }) => {
  try {
    const product = new Product({
      name,
      price,
      productImage,
    });
    await product.save();
    return product;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

exports.patchProduct = async ({ productId, name, price, productImage }) => {
  try {
    const product = await Product.findById(productId);
    if (product == null)
      throw new ServiceError({ message: 'product not found.', status: false, statusCode: 404 });

    if (name != null) product.name = name;
    if (price != null) product.price = price;
    if (productImage != null) product.productImage = productImage;

    const updatedProduct = await product.save();
    return updatedProduct;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

exports.deleteProduct = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (product == null)
      throw new ServiceError({ message: 'product not found.', status: false, statusCode: 404 });

    const removedProduct = await product.remove();
    return removedProduct;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};
