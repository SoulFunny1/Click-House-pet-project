const Category = require('../models/category');

module.exports = {
    async getAllCategories(req, res) {
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при получении категорий' });
        }
    },

    async createCategory(req, res) {
        try {
            const { name, img } = req.body;
            const category = await Category.create({ name, img });
            res.json(category);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при создании категории' });
        }
    }
};
