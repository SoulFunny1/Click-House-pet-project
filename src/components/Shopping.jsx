

const relatedProducts = [
  {
    id: 1,
    name: "VINTER 2020 ВИНТЕР 2020",
    sku: "312.31.32",
    price: "8 900",
    image: "https://placehold.co/100x100",
    description: "Вешалка напольная платяной 3-дверный 117x190 см",
    inStock: true,
  },
  {
    id: 2,
    name: "GLASIG ГЛАСИГ",
    sku: "312.31.32",
    price: "9 000",
    discount: "25%",
    image: "https://placehold.co/100x100",
    description: "Вешалка напольная платяной 3-дверный 117x190 см",
    inStock: true,
  },
  {
    id: 3,
    name: "FULLTALIG ФУЛЛТАЛИГ",
    sku: "312.31.32",
    price: "8 900",
    image: "https://placehold.co/100x100",
    description: "Вешалка напольная платяной 3-дверный 117x190 см",
    inStock: false,
  },
];

const CartPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 p-8">
        
        {/* Левая часть */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div className="mx-7">
               <h1 className="text-3xl font-bold">Корзина</h1> 
            </div>
            
            <button className="text-sm text-orange-500 hover:underline">
              Добавить товар по артикулу
            </button>
          </div>

          <div className="flex flex-col items-center text-center rounded-lg -mt-35">
            <img
              src="./shop.svg"
              alt="Man sitting on couch"
              className="w-full max-w-[600px]"
            />
            <p className="mt-4 text-gray-600">
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
          </div>
        </div>

        {/* Правая часть */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Может быть интересно</h2>
          <div className="space-y-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="flex gap-4 items-start border-b pb-4 last:border-none"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{p.name}</h3>
                  <p className="text-xs text-gray-500">
                    Арт. {p.sku}{" "}
                    {p.inStock && <span className="ml-2">• В наличии</span>}
                  </p>
                  <p className="text-xs text-gray-500">{p.description}</p>
                  <div className="mt-1 text-sm font-bold">
                    {p.discount ? (
                      <div className="flex gap-2 items-center">
                        <span className="text-red-500">{p.discount}</span>
                        <span className="line-through text-gray-400">
                          {p.price} Br
                        </span>
                        <span className="text-gray-800">{p.price} Br</span>
                      </div>
                    ) : (
                      <span>{p.price} Br</span>
                    )}
                  </div>
                </div>

                {/* Кнопка корзины */}
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600">
                  🛒
                </button>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="mt-6 block text-sm text-gray-500 hover:text-gray-700"
          >
            ← Все результаты
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
