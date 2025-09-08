const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const productsController = require('../controllers/productsController');

// Категории
router.get('/categories', categoriesController.getAllCategories);
router.post('/categories', categoriesController.createCategory);

// Товары
router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);
router.post('/products', productsController.createProduct);
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;
