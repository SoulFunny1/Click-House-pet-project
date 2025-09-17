import { useNavigate } from "react-router-dom";

export default function Menu({ onOpen, onPersOpen, onShop }) {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);  
    };
    return (
        <div className="">
            <header className="flex justify-between items-center p-5">
                <div className="mx-35 cursor-pointer">
                    <img onClick={onOpen} src="./Menu.svg" alt="" />
                </div>
                <div className="z-1 rounded-full border w-[400px] px-4 py-3 border-[#DCDCDC] flex justify-between">
                    <input type="text" placeholder="Что желаете найти?" className="text-[#7D7D7D] border-0 outline-0 w-[90%]" />
                    <div className="flex justify-end">
                        <img src="Union.svg" alt="" />
                    </div>
                </div>
                <div>
                    <p className="text-[#FF9900]">Вставить список покупок</p>
                </div>
                <div className="flex gap-3 mx-35">
                    <img src="./Star menu.svg" alt="" />
                    {onShop && (
                        <img onClick={() => handleNavigate("/shop")} src="./Korz Menu.svg" alt="" />
                    )}
                    <img onClick={onPersOpen} src="./Man menu.svg" alt="" />
                </div>
            </header>
        </div>
    )
}