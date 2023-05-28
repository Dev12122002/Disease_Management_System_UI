// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Header from "./components/Header";
import { Toaster } from 'react-hot-toast';
import AddDisease from "./pages/AddDisease";
import React from 'react'

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Toaster position='top-center' />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Disease/AddDisease" element={<AddDisease />} />
        <Route path="/Disease/UpdateDisease/:id" element={<AddDisease />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
