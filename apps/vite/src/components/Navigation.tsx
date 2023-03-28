/* eslint-disable arrow-body-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "User",
    path: "/user",
    subNav: [
      {
        title: "User",
        path: "/user",
      },
      {
        title: "info",
        path: "/user/info/2",
      },
      {
        title: "comment",
        path: "/user/comment",
      },
    ],
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="flex justify-between items-center h-16 bg-green-500 text-white  relative shadow-sm font-mono"
      role="navigation"
    >
      <Link to="/" className="pl-8">
        {/* Your Logo Here */}
      </Link>
      <div
        className="px-4 cursor-pointer md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </div>
      <div
        className={`absolute top-6 w-30 right-1 md:top-0 md:right-0 md:w-auto md:static  md:mt-0 md:flex md:items-center ${
          menuOpen ? "block" : "hidden"
        } px-4 md:px-0`}
        onClick={() => setMenuOpen(false)}
      >
        <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
          {navLinks.map((link, index) => {
            if (!link.subNav) {
              return (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="block px-4 py-2 rounded-md hover:bg-gray-200"
                  >
                    {link.title}
                  </Link>
                </li>
              );
            }

            return (
              <li key={index} className="">
                <div className="block  rounded-md  hover:showSub">
                  <div className="px-4 py-2 hover:bg-gray-200">
                    {link.title}
                  </div>
                  <ul className="md:absolute hidden z-10 text-gray-700 group-hover:block">
                    {link.subNav.map((subLink, subIndex) => {
                      return (
                        <li key={subIndex}>
                          <Link
                            to={subLink.path}
                            className="rounded-md px-4 py-2  block whitespace-no-wrap hover:bg-gray-200"
                          >
                            {subLink.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
