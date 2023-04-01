import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// import Footer from "./components/Footer";

import Home from "./pages/home/home";
import About from "./pages/about/About";
import Notfund from "./pages/404";
import UserLayout from "./pages/user/UserLayout";
import User from "./pages/user/user";
import Userinfo from "./pages/user/info";
import Comment from "./pages/user/comments";
import CommentItem from "./pages/user/commentsItem";

const Routex = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Notfund />} />
        <Route path="user" element={<UserLayout />}>
          <Route index path="" element={<User />} />
          <Route path="info/:id" element={<Userinfo />} />
          <Route path="comment" element={<Comment />} />
          <Route path="comment/:id" element={<CommentItem />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </Layout>
  </BrowserRouter>
);

export default Routex;
