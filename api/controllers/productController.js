const productService = require('../services/productService');

exports.listProducts = async () => {
  try {
    const products = await productService.listProducts();
    return products;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

exports.getProduct = async (productId) => {
  try {
    const product = await productService.getProduct(productId);
    return product;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

exports.createProduct = async ({ name, price, productImage }) => {
  try {
    const savedProduct = await productService.createProduct({
      name,
      price,
      productImage,
    });
    return savedProduct;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

exports.patchProduct = async ({ productId, name, price, productImage }) => {
  try {
    const updatedProduct = await productService.patchProduct({
      productId,
      name,
      price,
      productImage,
    });
    return updatedProduct;
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteProduct = async (productId) => {
  try {
    const removedProduct = await productService.deleteProduct(productId);
    return removedProduct;
  } catch (error) {
    throw new Error(error);
  }
};
