const Product = require('../models/product');

// ======================
// 📌 Получить все продукты
// ======================
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ======================
// 📌 Получить продукт по id
// ======================
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Продукт не найден' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ======================
// 📌 Создать продукт
// ======================
exports.createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ======================
// 📌 Обновить продукт (через POST /products/update/:id)
// ======================
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Продукт не найден' });
        }

        await product.update(req.body);
        res.json({ message: 'Продукт обновлён', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ======================
// 📌 Удалить продукт (через POST /products/delete/:id)
// ======================
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Продукт не найден' });
        }

        await product.destroy();
        res.json({ message: 'Продукт удалён' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
