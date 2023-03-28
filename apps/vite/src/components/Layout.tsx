import React from "react";
import Navigation from "./Navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 顶部菜单 */}
      <Navbar />

      {/* 导航栏 */}
      <Navigation />

      {/* 主要内容 */}
      <main className="flex-grow">{children}</main>

      {/* 底部 */}
      <Footer />
    </div>
  );
}

export default Layout;
