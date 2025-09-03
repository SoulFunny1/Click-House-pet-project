const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const cookieParser = require('cookie-parser'); // Добавьте это
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Укажите домен вашего Vue-приложения (например, Vite обычно на 5173)
    credentials: true, // Это ОЧЕНЬ ВАЖНО для отправки и получения куки
}));
app.use(express.json());
app.use(cookieParser()); // Добавьте это

// Подключение к базе данных и запуск сервера
sequelize
    .authenticate()
    .then(() => {
        console.log('Подключение к базе данных установлено успешно.');
        // return sequelize.sync(); // Синхронизация моделей после успешной аутентификации
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Не удалось подключиться к базе данных или синхронизировать модели:', err);
    });

app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send('API работает!');
});