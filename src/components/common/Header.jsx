import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header({ openAuth, onClosePersAccount }) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const checkToken = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        window.addEventListener("storage", checkToken);

        return () => {
            window.removeEventListener("storage", checkToken);
        };
    }, []);

    function handleAuthClick() {
        if (isLoggedIn) {
            localStorage.removeItem("token");
            onClosePersAccount();
            setIsLoggedIn(false);
            fetch("http://localhost:4000/api/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).catch(() => console.log("Ошибка при логауте на сервере"));
            navigate("/");
        } else {
            openAuth(); 
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (localStorage.getItem("token") && !isLoggedIn) {
                setIsLoggedIn(true);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [isLoggedIn]);

    return (
        <header className="relative">
            <div className="bg-[#F8F8F8] flex justify-between">
                <div className="p-4 mx-35">
                    <img
                        onClick={() => {
                            navigate("/");
                            onClosePersAccount();
                        }}
                        src="/header clickhouse.svg"
                        alt=""
                        className="cursor-pointer"
                    />
                </div>
                <div className="flex p-6 gap-6">
                    <p onClick={() => navigate("/catalog")} className="font-semibold cursor-pointer">
                        Каталог
                    </p>
                    <p className="font-semibold">Доставка</p>
                    <p className="font-semibold">Условия</p>
                    <p className="font-semibold">Контакты</p>
                </div>
                <div className="font-semibold p-4 mx-35">
                    8 702 701 50 75 / 8 702 701 50 75
                    <br />
                    <div className="flex justify-end">
                        <span className="text-[#7D7D7D]">Заказать звонок</span>
                    </div>
                </div>
                <div className="p-4 absolute right-0">
                    <button
                        onClick={handleAuthClick}
                        className="bg-[#FF9900] text-white p-4 rounded-full"
                    >
                        {isLoggedIn ? "Выход" : "Вход"}
                    </button>
                </div>
            </div>
        </header>
    );
}
