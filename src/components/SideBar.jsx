import { useState } from "react";

export default function SideBar({ onClose }) {
    return (
        <div className="bg-white w-[350px] absolute h-screen ">
            <header className="flex flex-col ">
                <div className="flex justify-between p-5">
                    <div className="mx-5">
                        <img src="./header clickhouse.svg" alt="" />
                    </div>
                    <div className="mx-5">
                        <img onClick={onClose} src="./X.svg" alt="" />
                    </div>
                </div>

                <div className="flex flex-col p-5 gap-2 mx-5">
                    <p className="font-extrabold text-[24px]">Каталог</p>
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