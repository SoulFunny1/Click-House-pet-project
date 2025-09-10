const Product = require('../models/product');
const Category = require('../models/category');

module.exports = {
    // Все продукты
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll({
                include: [{ model: Category, as: 'category' }]
            });
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: 'Ошибка при получении товаров' });
        }
    },

    // Один продукт
    async getProductById(req, res) {
        try {
            const { id } = req.query; // т.к. у тебя всё через GET/POST
            const product = await Product.findByPk(id, {
                include: [{ model: Category, as: 'category' }]
            });
            if (!product) return res.status(404).json({ error: 'Товар не найден' });
            res.json(product);
        } catch (err) {
            res.status(500).json({ error: 'Ошибка при получении товара' });
        }
    },

    // Создать продукт
    async createProduct(req, res) {
        try {
            const product = await Product.create(req.body);
            res.json(product);
        } catch (err) {
            res.status(500).json({ error: 'Ошибка при создании товара' });
        }
    },

    // Обновить продукт
    async updateProduct(req, res) {
        try {
            const { id } = req.body;
            await Product.update(req.body, { where: { id } });
            res.json({ message: 'Товар обновлен' });
        } catch (err) {
            res.status(500).json({ error: 'Ошибка при обновлении товара' });
        }
    },

    // Удалить продукт
    async deleteProduct(req, res) {
        try {
            const { id } = req.body;
            await Product.destroy({ where: { id } });
            res.json({ message: 'Товар удалён' });
        } catch (err) {
            res.status(500).json({ error: 'Ошибка при удалении товара' });
        }
    },
};
