// src/App.js

import { Routes, Route } from 'react-router-dom';
import { useState } from "react";

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import Menu from './components/common/Menu';
import SideBar from './components/SideBar';
import Catalog from './pages/Catalog';
import Auth from './components/Auth';
import Verify from './components/Verify';
import PersAccount from './components/PersAccount';
import ADMINKA from './components/ADMINKA';

export default function App() {
  const [open, setOpen] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);
  const [openPersAccount, setOpenPersAccount] = useState(false);

  function handleOpen() {
    setOpenVerify(true);
    setOpenAuth(false);
  }
  function handleOpenAuth() {
    setOpenAuth(true);
    setOpenVerify(false);
  }

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-screen w-full transition-20 duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setOpen(false)}
      ></div>

      <Header onClosePersAccount={() => setOpenPersAccount(false)} openAuth={() => setOpenAuth(true)} />
      <Menu onPersOpen={() => setOpenPersAccount(true)} onOpen={() => setOpen(true)} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="*" element={<div>404 - Страница не найдена</div>} />
        <Route path="/adminka" element={<ADMINKA />} />
      </Routes>

      <SideBar open={open} onClose={() => setOpen(false)} />
      <PersAccount open={openPersAccount} onClose={() => setOpenPersAccount(false)} />
      {openAuth && <Auth onOpenVerify={() => handleOpen()} open={openAuth} onClose={() => setOpenAuth(false)} />}
      <Verify open={openVerify} onOpenAuth={() => handleOpenAuth()} onCloseAuth={() => setOpenAuth(false)} onClose={() => setOpenVerify(false)} />
      <Footer />
    </div>
  );
}

