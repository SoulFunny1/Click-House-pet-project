import React, { useState, useEffect } from "react";
import axios from "axios";
import { createPortal } from "react-dom";

const API_URL = "http://localhost:4000/api";

const ProductManagement = () => {
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
  });

  // загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [prodRes, catRes] = await Promise.all([
          axios.get(`${API_URL}/all`),
          axios.get(`${API_URL}/categories`),
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        showModal("Ошибка загрузки данных");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // изменения формы
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // сохранение (новый или обновление)
  const handleSaveProduct = async (e) => {
  e.preventDefault();
  try {
    if (editingProduct) {
      await axios.post(`${API_URL}/update`, { id: editingProduct.id, ...formData });
      showModal("Товар обновлён!");
    } else {
      await axios.post(`${API_URL}/create`, formData);
      showModal("Товар добавлен!");
    }
    refreshProducts();
    handleCancel();
  } catch (err) {
    showModal("Ошибка при сохранении товара");
  }
};

  // редактирование
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      category_id: product.category_id || product.category?.id || "",
    });
  };

  // удаление
  const handleDeleteClick = async (id) => {
  try {
    await axios.post(`${API_URL}/delete`, { id });
    setProducts(products.filter((p) => p.id !== id));
    showModal("Товар удалён!");
  } catch (err) {
    showModal("Ошибка при удалении товара");
  }
};

  // отмена
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
    });
  };

  // обновление списка после изменений
  const refreshProducts = async () => {
  const res = await axios.get(`${API_URL}/all`);
  setProducts(res.data);
};

  // статус
  const getStatusText = (p) => {
    const s = [];
    if (p.inStock) s.push("В наличии");
    if (p.popular) s.push("Популярное");
    if (p.sale) s.push("Со скидкой");
    return s.join(", ") || "Нет статуса";
  };

  // модалка
  const showModal = (message) => {
    setModal({ visible: true, message });
    setTimeout(() => setModal({ visible: false, message: "" }), 2500);
  };

  if (isLoading) return <div className="text-center mt-8">Загрузка...</div>;

  const Modal = ({ message }) =>
    createPortal(
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start pt-20 z-50">
        <div className="p-4 rounded-lg shadow-xl bg-white">
          <p>{message}</p>
        </div>
      </div>,
      document.body
    );

  return (
    <div className="container mx-auto p-4 font-inter">
      {modal.visible && <Modal message={modal.message} />}

      {editingProduct === null ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Управление товарами</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3">Название</th>
                <th className="px-6 py-3">Категория</th>
                <th className="px-6 py-3">Цена</th>
                <th className="px-6 py-3">Статус</th>
                <th className="px-6 py-3">Действия</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4">{p.name}</td>
                  <td className="px-6 py-4">{p.category?.name}</td>
                  <td className="px-6 py-4">{p.price} руб.</td>
                  <td className="px-6 py-4">{getStatusText(p)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditClick(p)}
                      className="text-indigo-600 mr-4"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDeleteClick(p.id)}
                      className="text-red-600"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => setEditingProduct(false)}
            className="mt-6 px-4 py-2 bg-[#FF9900] text-white rounded-full"
          >
            Добавить товар
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            {editingProduct ? "Редактировать товар" : "Добавить товар"}
          </h2>
          <form onSubmit={handleSaveProduct}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Название"
              className="w-full border p-2 mb-4"
              required
            />
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className="w-full border p-2 mb-4"
              required
            >
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Цена"
              className="w-full border p-2 mb-4"
              required
            />
            <div className="flex gap-4 mb-4">
              <label>
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                />{" "}
                В наличии
              </label>
              <label>
                <input
                  type="checkbox"
                  name="popular"
                  checked={formData.popular}
                  onChange={handleInputChange}
                />{" "}
                Популярное
              </label>
              <label>
                <input
                  type="checkbox"
                  name="sale"
                  checked={formData.sale}
                  onChange={handleInputChange}
                />{" "}
                Со скидкой
              </label>
            </div>
            {formData.sale && (
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                placeholder="Скидка %"
                className="w-full border p-2 mb-4"
              />
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border rounded-full"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF9900] text-white rounded-full"
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

export default ProductManagement;
