import { Routes, Route } from 'react-router-dom';
import { useState } from "react";

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import Menu from './components/common/Menu';
import SideBar from './components/SideBar';
import Catalog from './pages/Catalog';
import Auth from './components/Auth';

export default function App() {
  const [open, setOpen] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-screen w-full  transition-20 duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setOpen(false)}
      ></div>


      <SideBar open={open} onClose={() => setOpen(false)} />
      <Auth open={openAuth} onClose={() => setOpenAuth(false)} />


      <Header />
      <Menu onOpen={() => setOpen(true)} onOpenAuth={() => setOpenAuth(true)} />


      <Routes>
        <Route path="/" element={<HomePage />}  />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="*" element={<div>404 - Страница не найдена</div>} />
      </Routes>
      <Footer />
    </div>
  );
}
