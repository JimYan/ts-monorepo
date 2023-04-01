import React from "react";
import Navigation from "./Navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-cyan-100">
        {/* 顶部菜单 */}
        <Navbar />

        {/* 导航栏 */}
        <Navigation />
      </div>

      {/* 主要内容 */}
      <main className="flex-grow">{children}</main>

      {/* 底部 */}
      <div className="bg-purple-100">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
