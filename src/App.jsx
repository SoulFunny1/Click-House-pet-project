import { Routes, Route } from 'react-router-dom';
import { useState } from "react";


import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import Menu from './components/common/Menu';
import SideBar from './components/SideBar';

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {open && <SideBar onClose={() => setOpen(false)} />}
      <Header /> {/* Этот компонент будет виден на всех страницах */}
           <Menu onOpen={() => setOpen(true)} />


      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Можно добавить маршрут для страницы "Не найдено" */}
        <Route path="*" element={<div>404 - Страница не найдена</div>} />
      </Routes>
      <Footer /> {/* И этот тоже */}
    </div>
  )
}