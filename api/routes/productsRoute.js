const express = require('express');
const authenticateUser = require('../common/authenticate');
const productController = require('../controllers/productController');
const processRequest = require('../util/processRequest');
const { upload } = require('../util/multerUpload');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // const { data, queryParams, pathParams, files } = processRequest(req);
    // validation on data, queryParams, pathParams, files
    const products = await productController.listProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
    // console.log(error.message);
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const { pathParams } = processRequest(req);
    const { productId } = pathParams;

    const product = await productController.getProduct(productId);

    if (product == null) res.status(404).json({ message: 'product not found' });
    else res.json(product);
  } catch (error) {
    // console.log(`error :: ${error}`);
    res.status(500).json({ message: error.message });
  }
});

router.post('/', authenticateUser, upload.single('productImage'), async (req, res) => {
  try {
    const { data, file } = processRequest(req);
    const { name, price } = data;
    const productImage = file.path;
    const savedProduct = await productController.createProduct({
      name,
      price,
      productImage,
    });
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:productId', authenticateUser, upload.single('productImage'), async (req, res) => {
  try {
    const { data, file, pathParams } = processRequest(req);
    const { name, price } = data;
    let productImage;
    if (file != null) productImage = file.path;
    const { productId } = pathParams;

    const updatedProduct = await productController.patchProduct({
      productId,
      name,
      price,
      productImage,
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:productId', authenticateUser, async (req, res) => {
  try {
    const { pathParams } = processRequest(req);
    const { productId } = pathParams;

    const deletedProduct = await productController.deleteProduct(productId);
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
