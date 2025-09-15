import React, { useState, useEffect } from "react";
import axios from "axios";
import { createPortal } from "react-dom";

const API_URL = "http://localhost:4000/api";

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState({ visible: false, message: "" });

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    price: "",
    inStock: true,
    popular: false,
    sale: false,
    discount: 0,
    image_url: "",
  });

  // Загрузка данных при старте приложения
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [prodRes, catRes] = await Promise.all([
          axios.get(`${API_URL}/products`),
          axios.get(`${API_URL}/categories`),
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
        showModal("Ошибка загрузки данных");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Обновляет список товаров
  const refreshProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Ошибка обновления списка товаров:", err);
      showModal("Ошибка обновления списка товаров");
    }
  };

  // Обработчик изменений в форме
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Обработчик отмены
  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category_id: "",
      price: "",
      inStock: true,
      popular: false,
      sale: false,
      discount: 0,
      image_url: "",
    });
  };

  // Обработчик нажатия "Редактировать"
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category_id: product.category_id || "",
      price: product.price,
      inStock: product.in_stock,
      popular: product.is_popular,
      sale: product.sale,
      discount: product.discount,
      image_url: product.image_url || "",
    });
  };

  // Обработчик сохранения (добавление или обновление)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Отправляем POST-запрос на новый маршрут обновления
        await axios.post(`${API_URL}/products/update/${editingProduct.id}`, formData);
        showModal("Товар обновлён!");
      } else {
        await axios.post(`${API_URL}/products`, formData);
        showModal("Товар добавлен!");
      }
      refreshProducts();
      handleCancel();
    } catch (err) {
      console.error("Ошибка при сохранении товара:", err);
      showModal("Ошибка при сохранении товара");
    }
  };

  // Обработчик удаления
  const handleDeleteClick = async (id) => {
    try {
      // Отправляем POST-запрос на новый маршрут удаления
      await axios.post(`${API_URL}/products/delete/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      showModal("Товар удалён!");
    } catch (err) {
      console.error("Ошибка при удалении товара:", err);
      showModal("Ошибка при удалении товара");
    }
  };

  // Статус
  const getStatusText = (p) => {
    const s = [];
    if (p.in_stock) s.push("В наличии");
    if (p.is_popular) s.push("Популярное");
    if (p.sale) s.push("Со скидкой");
    return s.join(", ") || "Нет статуса";
  };

  // Модальное окно
  const showModal = (message) => {
    setModal({ visible: true, message });
    setTimeout(() => setModal({ visible: false, message: "" }), 2500);
  };

  const Modal = ({ message }) =>
    createPortal(
      <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center pt-20 z-50 transition-opacity duration-300">
        <div className="bg-white p-6 rounded-lg shadow-2xl text-center transform transition-transform duration-300 scale-100">
          <p className="text-gray-800 font-semibold">{message}</p>
        </div>
      </div>,
      document.body
    );

  if (isLoading) return <div className="text-center mt-8 text-white">Загрузка...</div>;

  return (
    <div className="bg-gray-800 min-h-screen font-inter text-gray-200 p-8">
      {modal.visible && <Modal message={modal.message} />}

      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-teal-400">Панель управления товарами</h1>
        <p className="mt-2 text-gray-400">Здесь вы можете управлять всеми товарами и категориями.</p>
      </header>

      {editingProduct === null ? (
        <div className="max-w-7xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Список товаров</h2>
            <button
              onClick={() => setEditingProduct(false)}
              className="px-6 py-3 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75"
            >
              Добавить товар
            </button>
          </div>
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Название</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Категория</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Цена</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Статус</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{categories.find(c => c.id === p.category_id)?.name || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{p.price} руб.</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusText(p)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(p)}
                        className="text-indigo-400 hover:text-indigo-300 mr-4 transition-colors duration-200"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeleteClick(p.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            {editingProduct ? "Редактировать товар" : "Добавить товар"}
          </h2>
          <form onSubmit={handleSaveProduct}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-400">Название товара</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border-gray-700 text-white rounded-lg p-3 mt-1 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400">Категория</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border-gray-700 text-white rounded-lg p-3 mt-1 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                  required
                >
                  <option value="" className="bg-gray-800">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-gray-800">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-400">Цена</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border-gray-700 text-white rounded-lg p-3 mt-1 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400">URL изображения</label>
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border-gray-700 text-white rounded-lg p-3 mt-1 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
              />
            </div>
            <div className="flex items-center gap-6 mb-4">
              <label className="flex items-center text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="form-checkbox h-5 w-5 text-teal-500 bg-gray-700 rounded transition duration-150 ease-in-out"
                />
                <span className="ml-2">В наличии</span>
              </label>
              <label className="flex items-center text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  name="popular"
                  checked={formData.popular}
                  onChange={handleInputChange}
                  className="form-checkbox h-5 w-5 text-teal-500 bg-gray-700 rounded transition duration-150 ease-in-out"
                />
                <span className="ml-2">Популярное</span>
              </label>
              <label className="flex items-center text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  name="sale"
                  checked={formData.sale}
                  onChange={handleInputChange}
                  className="form-checkbox h-5 w-5 text-teal-500 bg-gray-700 rounded transition duration-150 ease-in-out"
                />
                <span className="ml-2">Со скидкой</span>
              </label>
            </div>
            {formData.sale && (
              <div className="mb-4">
                <label className="block text-gray-400">Скидка %</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border-gray-700 text-white rounded-lg p-3 mt-1 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                  required
                />
              </div>
            )}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-600 rounded-full text-gray-400 hover:bg-gray-700 transition-colors duration-200"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-600 transition-colors duration-200"
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
