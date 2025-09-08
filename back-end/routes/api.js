const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const productsController = require('../controllers/productsController');

// Категории
router.get('/categories', categoriesController.getAllCategories);
router.post('/categories', categoriesController.createCategory);

// Товары
router.get('/products', (req, res) => {
  const filter = req.query.filter;
  if (filter) {
    productsController.getFilteredProducts(req, res);
  } else {
    productsController.getAllProducts(req, res);
  }
});
router.get('/products/:id', productsController.getProductById);
router.post('/products', productsController.createProduct);
router.post('/products/delete', productsController.deleteProduct);


module.exports = router;
