import { useState } from "react";
import Swal from "sweetalert2";
export default function PersAccount({ open, onClose }) {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${document.cookie.split('token=')[1]}`
                },
                credentials: 'include',
                body: JSON.stringify({ phone, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    title: 'Данные обновлены',
                    text: 'Данные успешно обновлены',
                    icon: 'success',
                });
            } else {
                Swal.fire({
                    title: 'Ошибка обновления',
                    text: 'Произошла ошибка при обновлении данных',
                    icon: 'error',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Техническая ошибка',
                text: 'Ошибка сервера',
                icon: 'error',
            });
        }
    };
    return (
        <div
            className={`bg-white w-full ] fixed top-[20%] right-0 h-screen shadow-lg transform transition-transform duration-300 ease-in-out z-50
                ${open ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="flex justify-center p-10 ">
                <h1 className="text-[24px] font-extrabold">Личный кабинет</h1>
            </div>
            <div className="flex flex-col">
                <form onSubmit={handleUpdate} className="flex flex-col items-center gap-2">
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-[20%] mb-2 outline-0 p-2.5 border border-[#DCDCDC] rounded-full shadow-[inset_0_0_8px_#dcdcdc]"
                        placeholder="Телефон"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-[20%] mb-2 outline-0 p-2.5 border border-[#DCDCDC] rounded-full shadow-[inset_0_0_8px_#dcdcdc]"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-[20%] mb-2 outline-0 p-2.5 border border-[#DCDCDC] rounded-full shadow-[inset_0_0_8px_#dcdcdc]"
                        placeholder="Пароль"
                        required
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-[20%] mb-2 outline-0 p-2.5 border border-[#DCDCDC] rounded-full shadow-[inset_0_0_8px_#dcdcdc]"
                        placeholder="Повторите пароль"
                        required
                    />
                    <button className="w-[18%]  bg-[#FF9900] py-2.5 rounded-full font-serif text-amber-50" type="submit">
                        Сохранить
                    </button>
                </form>
                <div className="flex justify-center p-5">
                    <p onClick={onClose}>Выход</p>
                </div>
            </div>

        </div>
    );
}