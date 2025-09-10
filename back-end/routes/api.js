const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const productsController = require('../controllers/productsController');

// Категории
router.get('/categories', categoriesController.getAllCategories);
router.post('/categories', categoriesController.createCategory);

// Все товары
router.get('/all', productsController.getAllProducts);

// Один товар (через ?id=)
router.get('/get', productsController.getProductById);

// Фильтрация (например ?filter=popular)
router.get('/filter', productsController.getFilteredProducts);

// Создать товар
router.post('/create', productsController.createProduct);

// Обновить товар
router.post('/update', productsController.updateProduct);

// Удалить товар
router.post('/delete', productsController.deleteProduct);

module.exports = router;
