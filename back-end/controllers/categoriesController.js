const Category = require('../models/category');

// ======================
// 📌 Получить все категории
// ======================
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ======================
// 📌 Создать категорию
// ======================
exports.createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ======================
// 📌 Обновить категорию (POST /categories/update/:id)
// ======================
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Категория не найдена' });
        }

        await category.update(req.body);
        res.json({ message: 'Категория обновлена', category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ======================
// 📌 Удалить категорию (POST /categories/delete/:id)
// ======================
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Категория не найдена' });
        }

        await category.destroy();
        res.json({ message: 'Категория удалена' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
