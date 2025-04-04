import { Menu } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={"/"} className="flex-shrink-0 flex items-center">
              <img src="/logo.png" className="size-7" />
              <span className="ml-2 text-xl font-bold text-primary">
                TerraSentra
              </span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <div
                className="relative"
                onMouseEnter={() => setIsFeaturesOpen(true)}
                onMouseLeave={() => setIsFeaturesOpen(false)}
              >
                <div
                  
                  className="border-transparent text-gray-500 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Features
                </div>
                {isFeaturesOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                    <a
                      href="/potential-regions"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Potential Region
                    </a>
                    <a
                      href="/greenbond-marketplace"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Green Bond Marketplace
                    </a>
                    <a
                      href="/green-credit-marketplace"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Green Credit Marketplace
                    </a>
                  </div>
                )}
              </div>
              <a
                href="#about"
                className="border-transparent text-gray-500 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About Us
              </a>
              <a
                href="/#how-it-works"
                className="border-transparent text-gray-500 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                How It Works
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <button className="px-4 py-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
              Login
            </button>
            <button className="px-4 py-2 bg-primary rounded-md text-white font-medium hover:bg-green-700 focus:outline-none">
              Register
            </button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#features"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#about"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </a>
            <a
              href="#how-it-works"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <div className="mt-4 space-y-2 px-3">
              <button className="w-full px-4 py-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
                Login
              </button>
              <button className="w-full px-4 py-2 bg-primary rounded-md text-white font-medium hover:bg-green-700 focus:outline-none">
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
