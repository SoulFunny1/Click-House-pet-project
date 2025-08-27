import { useNavigate } from "react-router-dom";
export default function SideBar({ open, onClose }) {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        onClose();  // закрыть сайдбар
        navigate(path);  // перейти на страницу
    };
    return (
        <div
            className={`bg-white w-[350px] fixed top-0 left-0 h-screen shadow-lg transform transition-transform duration-300 ease-in-out
                ${open ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <header className="flex flex-col">
                <div className="flex justify-between p-5">
                    <div className="mx-5">
                        <img src="./header clickhouse.svg" alt="" />
                    </div>
                    <div className="mx-5">
                        <img onClick={onClose} src="./X.svg" alt="" className="cursor-pointer" />
                    </div>
                </div>

                <div className="flex flex-col p-5 gap-2 mx-5">
                    <p onClick={() => handleNavigate("/catalog")} className="font-extrabold text-[24px] cursor-pointer">
                        Каталог
                    </p>
                    <p className="font-extrabold text-[24px]">Товары в наличии</p>
                    <p className="font-extrabold text-[24px]">Скидки</p>
                    <p className="font-extrabold text-[24px]">Популярное</p>
                    <p className="font-extrabold text-[24px]">Вдохновение</p>
                    <p className="text-[#5A5A5A]">Доставка</p>
                    <p className="text-[#5A5A5A]">Услуги</p>
                    <p className="text-[#5A5A5A]">Условия</p>
                    <p className="text-[#5A5A5A]">Контакты</p>
                </div>
            </header>
        </div>
    );
}
