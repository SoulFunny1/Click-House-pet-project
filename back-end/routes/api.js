const express = require('express');
const router = express.Router();

// контроллеры
const categoriesController = require('../controllers/categoriesController');
const productsController = require('../controllers/productsController');

// ======================
// 📌 Категории
// ======================
router.get('/categories', categoriesController.getAllCategories);
router.post('/categories', categoriesController.createCategory);
router.post('/categories/update/:id', categoriesController.updateCategory);
router.post('/categories/delete/:id', categoriesController.deleteCategory);

// ======================
// 📌 Продукты
// ======================
router.get('/products', productsController.getAllProducts);
router.post('/products', productsController.createProduct);
router.get('/products/:id', productsController.getProductById); 
router.post('/products/update/:id', productsController.updateProduct); 
router.post('/products/delete/:id', productsController.deleteProduct); 



module.exports = router;
