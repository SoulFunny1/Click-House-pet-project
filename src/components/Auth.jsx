import { useState } from "react";

export default function Auth({ open, onClose }) {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault(); // отменяем перезагрузку страницы

        if (password !== confirmPassword) {
            alert("Пароли не совпадают");
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ phone, email, password }),
                credentials: "include"
            });

            const data = await response.json();
            console.log("Ответ сервера:", data);
        } catch (error) {
            console.error("Ошибка запроса:", error);
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
                        <p className="text-[30px] font-semibold">Регистрация</p>
                    </div>
                    <div>
                        <form onSubmit={handleRegister} className="flex flex-col px-7">
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mb-2 outline-0 p-2.5 border border-[#DCDCDC] rounded-full shadow-[inset_0_0_8px_#dcdcdc]"
                                placeholder="Телефон"
                                required
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mb-2 outline-0 p-2.5 border border-[#DCDCDC] rounded-full shadow-[inset_0_0_8px_#dcdcdc]"
                                placeholder="Email"
                                required
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mb-2 outline-0 p-2.5 border border-[#DCDCDC] rounded-full shadow-[inset_0_0_8px_#dcdcdc]"
                                placeholder="Пароль"
                                required
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mb-2 outline-0 p-2.5 border border-[#DCDCDC] rounded-full shadow-[inset_0_0_8px_#dcdcdc]"
                                placeholder="Повторите пароль"
                                required
                            />
                            <div className="px-2 py-5">
                                <p className="text-[#5A5A5A]">Я даю согласие на обработку <br />
                                    персональных данных</p>
                            </div>
                            <button className="bg-[#FF9900] py-2.5 rounded-full font-serif text-amber-50" type="submit">
                                Зарегистрироваться
                            </button>
                        </form>
                        <div className="flex justify-center gap-30 p-5">
                            <p className="text-[#5A5A5A]">Вход</p>
                            <p className="text-[#5A5A5A]">Восстановление пароля</p>
                        </div>
                        <div className="px-9">
                            <p className="font-semibold">Регистрация через социальную сеть</p>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
