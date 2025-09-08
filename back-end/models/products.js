const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // подключение к базе
const Category = require('./category');

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
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0.00,
    },
    is_popular: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: 'products',
    timestamps: true,
});
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });

module.exports = Product;
