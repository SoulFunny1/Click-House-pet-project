const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Предполагается, что у вас есть файл database.js с настройками Sequelize

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone:{
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: true
    },  
}, {
    tableName: 'users', // Название таблицы в базе данных
    timestamps: true, // Автоматически добавляет поля createdAt и updatedAt
});

module.exports = User;