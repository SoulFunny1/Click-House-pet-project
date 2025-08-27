export default function Footer() {
    return (
        <div className="mt-10">
            <header className="flex justify-between p-20 bg-gray-400 ">
                <div>
                    <div className="mb-5">
                        <img src="./header clickhouse.svg" alt="" />
                    </div>

                    <div>
                        <p className="font-bold text-[20px]">Информация</p>
                        <br />
                    </div>
                    <div>
                        <p>Все права защищены © 2015 <br /> интернет-магазин AIKEA.BY <br /> Беларусь.</p>
                        <br />
                    </div>
                    <div>
                        <p>УНП 191828159 ИП Парейко В.С., <br /> регистрационный номер в <br /> торговом реестре 158299</p>
                        <br />
                    </div>
                    <div>
                        <p>Политика конфиденциальности</p>
                    </div>
                </div>
                <div className="">
                    <div className="mb-15 "></div>
                    <p className="font-bold text-[20px]">Меню</p><br />
                    <div className="flex gap-2">
                        <p>Главная </p>
                        <div className="w-[1px] h-[15px] bg-[#DCDCDC]"></div>
                        <p>Каталог</p>
                        <div className="w-[1px] h-[15px] bg-[#DCDCDC]"></div>
                        <p>Товары в наличии</p>
                    </div><div className="p-2"></div>
                    <div className="flex gap-2">
                        <p>Скидки</p>
                        <div className="w-[1px] h-[15px] bg-[#DCDCDC]"></div>
                        <p>Популярное</p>
                        <div className="w-[1px] h-[15px] bg-[#DCDCDC]"></div>
                        <p>Вдохновение</p>
                    </div><div className="p-2"></div>
                    <div className="flex gap-2">
                        <p>Доставка</p>
                        <div className="w-[1px] h-[15px] bg-[#DCDCDC]"></div>
                        <p>Услуги</p>
                        <div className="w-[1px] h-[15px] bg-[#DCDCDC]"></div>
                        <p>Условия</p>
                    </div><div className="p-2"></div>
                    <div className="flex gap-2">
                        <p>Контакты</p>
                        <div className="w-[1px] h-[15px] bg-[#DCDCDC]"></div>
                        <p>Вставить</p>
                        <div className="w-[1px] h-[15px] bg-[#DCDCDC]"></div>
                        <p>Cписок покупок</p>
                    </div><div className="p-2"></div>
                    <div className="flex gap-2">
                        <p>Корзина</p>
                        <div className="w-[1px] h-[15px] bg-[#DCDCDC]"></div>
                        <p>Личный кабинет</p>
                        <div className="w-[1px] h-[15px] bg-[#DCDCDC]"></div>
                        <p>Избранное</p>

                    </div>
                </div>
                <div>
                    <div className="mb-15"></div>
                    <p className="font-bold text-[20px]">Контакты</p><div className="p-2"></div>
                    <div>
                        <p>г.Минск</p>
                    </div><div className="p-2"></div>
                    <div>
                        <p>Ул. Первомайская, Д. 1, Кв. 43</p>
                    </div><div className="p-2"></div>
                    <div>
                        <p>+ 375 434 847 28 84</p>
                    </div><div className="p-2"></div>
                    <div>
                        <p>+ 375 448 473 09 48</p>
                    </div><div className="p-2"></div>
                    <div>
                        <p>ikeaekspress@gmail.com</p>
                    </div>
                </div>
            </header>

        </div>
    );
}