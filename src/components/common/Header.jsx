import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="">
            <div className="bg-[#F8F8F8] flex justify-between">
                <div className="p-4 mx-35">
                    <img onClick={() => navigate("/")} src="/header clickhouse.svg" alt="" className="cursor-pointer"/>
                </div>
                <div className="flex p-6 gap-6">
                    <p onClick={() => navigate("/catalog")} className="font-semibold cursor-pointer">Каталог</p>
                    <p className="font-semibold">Доставка</p>
                    <p className="font-semibold">Условия</p>
                    <p className="font-semibold">Контакты</p>
                </div>
                <div className="font-semibold mx-35 p-4">
                    8 702 701 50 75 / 8 702 701 50 75
                    <br />
                    <div className="flex justify-end">
                        <span className="text-[#7D7D7D]">Заказать звонок</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
