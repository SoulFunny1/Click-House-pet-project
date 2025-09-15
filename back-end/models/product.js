// models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// 📌 УБРАТЬ: const Category = require('../models/category');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    popular: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    inStock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    sale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'categories',
            key: 'id',
        },
    },
}, {
    tableName: 'products',
    timestamps: true,
});

// 📌 УБРАТЬ: Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
// 📌 УБРАТЬ: Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });

module.exports = Product;