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

    module.exports = { register, login, logout };
