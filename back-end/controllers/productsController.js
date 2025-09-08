const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports = {
    // ✅ Получить все товары (с категориями)
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll({
                include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }]
            });
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при получении товаров' });
        }
    },

    // ✅ Получить товар по ID
    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id, {
                include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }]
            });
            if (!product) {
                return res.status(404).json({ message: 'Товар не найден' });
            }
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при получении товара' });
        }
    },

    // ✅ Добавить товар
    async createProduct(req, res) {
        try {
            const { category_id, name, img, price, old_price, discount, is_popular, in_stock } = req.body;
            const product = await Product.create({
                category_id,
                name,
                img,
                price,
                old_price,
                discount,
                is_popular,
                in_stock
            });
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при создании товара' });
        }
    },

    // ✅ Удалить товар
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Product.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ message: 'Товар не найден' });
            }
            res.json({ message: 'Товар удален' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при удалении товара' });
        }
    }
};
