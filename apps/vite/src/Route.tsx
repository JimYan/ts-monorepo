import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";

import Home from "./pages/home/home";
import About from "./pages/about/About";
import Notfund from "./pages/404";
import UserLayout from "./pages/user/UserLayout";
import User from "./pages/user/user";
import Userinfo from "./pages/user/info";

const Routex = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<Notfund />} />
      <Route path="user" element={<UserLayout />}>
        <Route index path="" element={<User />} />
        <Route path="info/:id" element={<Userinfo />} />
      </Route>
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default Routex;
