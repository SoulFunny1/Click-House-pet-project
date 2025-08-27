    export default function Menu({onOpen}) {
        return (
            <div className="">
                <header className="flex justify-between items-center p-5">
                    <div className="mx-35">
                        <img onClick={onOpen}  src="./Menu.svg" alt="" />
                    </div>
                    <div className="rounded-full border px-35 py-3 border-[#DCDCDC] flex ">
                        <input type="text" placeholder="Что желаете найти?" className="text-[#7D7D7D] border-0 outline-0" />
                        <div className="flex justify-end">
                            <img src="Union.svg" alt="" />
                        </div>
                    </div>
                    <div>
                        <p className="text-[#FF9900]">Вставить список покупок</p>
                    </div>
                    <div className="flex gap-3 mx-35">
                        <img src="./Star menu.svg" alt="" />
                        <img src="./Korz Menu.svg" alt="" />
                        <img src="./Man menu.svg" alt="" />
                    </div>
                </header>
            </div>
        )
    }