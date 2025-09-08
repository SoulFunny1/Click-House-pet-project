const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');

// Регистрация пользователя
const register = async (req, res) => {
    try {
        const { phone, email, password } = req.body;

        // Проверка, существует ли уже пользователь с таким телефоном или email
        const existingUser = await User.findOne({
            where: {
                [Sequelize.Op.or]: [{ phone }, { email }],
            },
        });

        if (existingUser) {
            return res.status(409).json({ message: 'Пользователь с таким телефоном или email уже существует' });
        }

        // Хэширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание нового пользователя
        await User.create({
            phone,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json({ message: 'Ошибка сервера при регистрации' });
    }
};

// Авторизация пользователя
const login = async (req, res) => {
    try {
        const { identifier, password } = req.body; // identifier может быть email или phone

        // Поиск пользователя по email или телефону
        const user = await User.findOne({
            where: {
                [Sequelize.Op.or]: [{ email: identifier }, { phone: identifier }],
            },
        });

        if (!user) {
            return res.status(401).json({ message: 'Неверные учетные данные' });
        }

        // Сравнение паролей
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Неверные учетные данные' });
        }

        // Создание JWT токена
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_LIFETIME || '1h' }
        );

        // Установка JWT в HTTP-only куки
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 3600000, // 1 час
        });

        res.status(200).json({ token, userId: user.id, email: user.email, phone: user.phone });
    } catch (error) {
        console.error('Ошибка входа:', error);
        res.status(500).json({ message: 'Ошибка сервера при входе' });
    }
};

// Выход из системы
const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
        });
        res.status(200).json({ message: 'Выход выполнен успешно' });
    } catch (error) {
        console.error('Ошибка выхода:', error);
        res.status(500).json({ message: 'Ошибка сервера при выходе' });
    }
};

const updateUser = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const { phone, email, password } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        if (phone) user.phone = phone;
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        res.status(200).json({ message: 'Данные обновлены успешно', user });
    } catch (error) {
        console.error('Ошибка обновления:', error);
        res.status(500).json({ message: 'Ошибка сервера при обновлении' });
    }
};

const findPerson = async (req, res) => {
    try {
        const token = req.cookies.token; // Если используешь куки
        if (!token) {
            return res.status(401).json({ message: 'Токен отсутствует' });
        }

        // Проверка токена
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Поиск пользователя по ID
        const user = await User.findByPk(decoded.userId, {
            attributes: ['id', 'email', 'phone'] // не возвращаем пароль
        });

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Ошибка при получении пользователя:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};



module.exports = { register, login, logout, updateUser, findPerson };
