import Kartochki from '../hooks/Kartochki.json';
import Skidka from '../hooks/Skidki.json'
import Nalichii from '../hooks/V Nalichii.json'
import Popular from '../hooks/Popular.json'
import { useState } from "react";

export default function HomePage() {
    const slides = ["./HomeImage.svg", "./HomeImage2.svg", "./HomeImage3.svg"];
    const [current, setCurrent] = useState(0);
    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };
    return (
        <div>
            <header className="flex justify-center items-center p-5 gap-10 ">
                <div className="border border-gray-300 rounded-[60px]  ">
                    <div className="p-10 rounded-[60px] ">
                        <p className="text-[43px] font-bold">Мебель на <br /> любой вкус!</p>
                        <div className="flex gap-2">
                            <img src="./dot.svg" alt="" />
                            <p className="text-[18px]">Худи, чашки для горячего чая и термосы </p>
                        </div>

                        <div className="flex gap-2">
                            <img src="./dot.svg" alt="" />
                            <p className="text-[18px]">Eлочные игрушки, брелочки</p>
                        </div>
                        <div className="flex gap-2">
                            <img src="./dot.svg" alt="" />
                            <p className="text-[18px]">Начало списка вещей, которые можно</p>
                        </div>

                        <div className="p-2">
                            <button className="bg-[#FF9900] text-white p-3 rounded-[30px] w-full">Перейти в каталог</button>
                        </div>
                        <div className="p-2">
                            <button className="border border-gray-300 p-3 rounded-[30px] w-full text-[#FF9900]">Внести список артикулов</button>
                        </div>

                    </div>


                </div>

                <div className="relative">
                    {/* Левая стрелка */}
                    <div className="absolute left-0 top-[50%]" onClick={prevSlide}>
                        <svg className='rotate-180' width="22" height="40" viewBox="0 0 22 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.78467 2.21484L19.8526 20.2828L1.78467 38.3508" stroke="white" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div>

                    {/* Правая стрелка */}
                    <div className="absolute top-[50%] right-0" onClick={nextSlide}>
                        <svg  width="22" height="40" viewBox="0 0 22 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.78467 2.21484L19.8526 20.2828L1.78467 38.3508" stroke="white" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div>

                    {/* Точки */}
                    <div className="absolute  bottom-[30px] left-[45%]">
                        <button
                            onClick={() => setCurrent(0)}
                            className={`w-[50px] h-[6px] rounded-full ${current === 0 ? "bg-[#FF9900]" : "bg-black"
                                }`}
                        ></button>
                    </div>
                    <div className="absolute bottom-[30px] left-[52%]">
                        <button
                            onClick={() => setCurrent(1)}
                            className={`w-[50px] h-[6px] rounded-full ${current === 1 ? "bg-[#FF9900]" : "bg-black"
                                }`}
                        ></button>
                    </div>
                    <div className="absolute bottom-[30px] left-[38%]">
                        <button
                            onClick={() => setCurrent(2)}
                            className={`w-[50px] h-[6px] rounded-full ${current === 2 ? "bg-[#FF9900]" : "bg-black"
                                }`}
                        ></button>
                    </div>

                    {/* Картинка */}
                    <div>
                        <img className='object-contain w-[786px] h-[487px]' src={slides[current]} alt="Slide" />
                    </div>
                </div>
            </header>


            <header className="mx-35">
                <div className="flex  items-center p-5 gap-10 ">
                    <p className="text-[34px] font-bold">Популярные категории</p>
                    <div className='mt-3'>
                        <p className="text-[18px]">Все категории  -</p>
                    </div>
                </div>

                {/* ЭТО КАРТОЧКИ */}
                <div className="grid grid-cols-5 gap-5 p-2">
                    {Kartochki.map((item, index) => (
                        <div key={index} className="flex flex-col justify-center items-center border border-gray-300 w-[300px] h-[250px]  rounded-3xl shadow hover:shadow-lg transition">
                            <img src={item.img} alt={item.name} className="px-10 object-contain max-h-full max-w-full" />
                            <div className='flex items-center'>
                                <p className="mt-7 text-[18px] font-semibold">{item.name}</p>
                            </div>

                        </div>
                    ))}
                </div>

                {/* ЭТО SKIDKI */}


                <div className='flex items-center p-5 gap-4'>
                    <p className='text-[36px] font-bold'>Скидки <span className='text-red-500 font-light' >%</span></p>
                    <div className='mt-3'>
                        <p className='text-[18px]'>Все товары в категории -</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-5 justify-center">
                    {Skidka.map((item, index) => (
                        <div
                            key={index}
                            className="group relative w-80 bg-white border border-gray-300 rounded-3xl shadow hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer overflow-hidden"
                        >

                            <div className="w-full h-80 flex items-center justify-center">
                                <img
                                    src={item.img}
                                    alt={item.text}
                                    className="max-h-full object-contain"
                                />
                            </div>

                            {item.skidka && (
                                <div className="text-red-500 text-[18px] font-bold px-3 py-1 rounded-full">
                                    {item.skidka}
                                </div>
                            )}

                            <div className="p-4 flex flex-col gap-2">
                                <p className="text-lg font-semibold text-gray-800">{item.text}</p>

                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-[#FF9900]">{item.price}</span>
                                    {item.price2 && (
                                        <span className="text-gray-400 line-through text-sm">
                                            {item.price2}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button
                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3 bg-[#FF9900] text-white font-bold px-5 py-2 rounded-full shadow-lg transition-all duration-300 hover:bg-[#e68a00]"
                            >
                                <img src="./korzina.svg" alt="" />
                            </button>
                        </div>
                    ))}
                </div>



                <div className='flex items-center p-5 gap-4'>
                    <p className='text-[36px] font-bold'>Товары в наличии</p>
                    <div className='mt-3'>
                        <p className='text-[18px]'>Все товары в категории -</p>
                    </div>
                </div>


                <div className="flex flex-wrap gap-5 justify-center">
                    {Nalichii.map((item, index) => (
                        <div
                            key={index}
                            className="group relative w-80 bg-white border border-gray-300 rounded-3xl shadow hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer overflow-hidden"
                        >
                            <div className="w-full h-80 flex items-center justify-center">
                                <img
                                    src={item.img}
                                    alt={item.text}
                                    className="max-h-full object-contain"
                                />
                            </div>

                            {item.skidka && (
                                <div className="text-red-500 text-[18px] font-bold px-3 py-1 rounded-full">
                                    {item.skidka}
                                </div>
                            )}

                            <div className="p-4 flex flex-col gap-2">
                                <p className="text-lg font-semibold text-gray-800">{item.text}</p>

                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-[#FF9900]">{item.price}</span>
                                    {item.price2 && (
                                        <span className="text-gray-400 line-through text-sm">
                                            {item.price2}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button
                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3 bg-[#FF9900] text-white font-bold px-5 py-2 rounded-full shadow-lg transition-all duration-300 hover:bg-[#e68a00]"
                            >
                                <img src="./korzina.svg" alt="" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className='flex items-center p-5 gap-4'>
                    <p className='text-[36px] font-bold'>Популярное</p>
                    <div className='mt-3'>
                        <p className='text-[18px]'>Все товары в категории -</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-5 justify-center">
                    {Popular.map((item, index) => (
                        <div
                            key={index}
                            className="group relative w-80 bg-white border border-gray-300 rounded-3xl shadow hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer overflow-hidden"
                        >
                            <div className="w-full h-80 flex items-center justify-center">
                                <img
                                    src={item.img}
                                    alt={item.text}
                                    className="max-h-full object-contain"
                                />
                            </div>

                            {item.skidka && (
                                <div className="text-red-500 text-[18px] font-bold px-3 py-1 rounded-full">
                                    {item.skidka}
                                </div>
                            )}

                            <div className="p-4 flex flex-col gap-2">
                                <p className="text-lg font-semibold text-gray-800">{item.text}</p>

                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-[#FF9900]">{item.price}</span>
                                    {item.price2 && (
                                        <span className="text-gray-400 line-through text-sm">
                                            {item.price2}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button
                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3 bg-[#FF9900] text-white font-bold px-5 py-2 rounded-full shadow-lg transition-all duration-300 hover:bg-[#e68a00]"
                            >
                                <img src="./korzina.svg" alt="" />
                            </button>
                        </div>
                    ))}
                </div>


            </header>



        </div>
    )
}