const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Подключение роутов
app.use('/api', authRoutes);
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('API работает!');
});

// Запуск сервера
sequelize.authenticate()
    .then(() => {
        console.log('Подключение к базе данных установлено успешно.');
        app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
    })
    .catch((err) => console.error('Ошибка подключения к БД:', err));
