/* eslint-disable padding-line-between-statements */
import React from "react";

function Navbar() {
  return (
    <div className="bg-green-500 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
            <h1 className="text-white ml-2 text-lg font-semibold">
              My Website
            </h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline">
              <a
                href="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-green-700"
              >
                Login
              </a>
              <a
                href="/about"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-green-700"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
