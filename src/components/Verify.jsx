import { useState } from "react";
import Swal from 'sweetalert2';
export default function Verify({ open, onClose, onOpenAuth, onCloseAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault(); // отменяем перезагрузку страницы

        try {
            const response = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ identifier: email, password }),
                credentials: "include"
            });

            const data = await response.json();
            console.log("Ответ сервера:", data);

            if (response.ok) {
                onClose();
                onCloseAuth();

                Swal.fire({
                    title: 'Успешная авторизация',
                    text: 'Вы успешно авторизовались',
                    icon: 'success',
                });
                localStorage.setItem('token', data.jwt);
            }
            if(response.status === 401) {
                Swal.fire({
                    title: 'Авторизация не удалась',
                    text: 'Проверьте введенные данные',
                    icon: 'error',
                });
            }
        } catch (error) {
            console.error("Ошибка запроса:", error);
            Swal.fire({
                    title: 'Авторизация не удалась',
                    text: 'Ошибка сервера',
                    icon: 'error',
                });
        }
    };

    return (
        <div
            className={`bg-white w-[400px] fixed top-0 right-0 h-screen shadow-lg transform transition-transform duration-300 ease-in-out z-50
                ${open ? "translate-x-0" : "translate-x-full"}`}
        >
            <header className="flex flex-col">
                <div className="flex justify-end p-10">
                    <img onClick={onClose} src="./X.svg" alt="" className="cursor-pointer" />
                </div>
                <div>
                    <div className="px-7 py-2">
                        <p className="text-[30px] font-semibold">Вход</p>
                    </div>
                    <div>
                        <form onSubmit={handleRegister} className="flex flex-col px-7">
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="mb-2 outline-0 p-2.5 border border-[#DCDCDC] rounded-full shadow-[inset_0_0_8px_#dcdcdc]"
                                placeholder="Email"
                                required
                            />
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="mb-2 outline-0 p-2.5 border border-[#DCDCDC] rounded-full shadow-[inset_0_0_8px_#dcdcdc]"
                                placeholder="Пароль"
                                required
                            />
                            <button className="bg-[#FF9900] py-2.5 rounded-full font-serif text-amber-50" type="submit">
                                Авторизоваться
                            </button>
                        </form>
                        <div className="flex justify-center gap-20 p-5">
                            <p onClick={onOpenAuth} className="text-[#5A5A5A]">Регистрация</p>
                            <p className="text-[#5A5A5A]">Восстановление пароля</p>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
