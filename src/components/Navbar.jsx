import React, { useState } from "react";

export default function NavbarSimple() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-900 text-gray-200 shadow-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg
            className="w-7 h-7 text-blue-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2l8 4v5c0 5-3.58 9.74-8 11-4.42-1.26-8-6-8-11V6l8-4z"
              fill="currentColor"
            />
          </svg>
          <h1 className="text-xl font-bold tracking-wide">SecureVault</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li className="hover:text-blue-400 cursor-pointer transition">Home</li>
          <li className="hover:text-blue-400 cursor-pointer transition">Vault</li>
          <li className="hover:text-blue-400 cursor-pointer transition">About</li>
          <li className="hover:text-blue-400 cursor-pointer transition">Contact</li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-gray-900 px-4 pb-4 flex flex-col gap-3">
          <li className="hover:text-blue-400 cursor-pointer transition">Home</li>
          <li className="hover:text-blue-400 cursor-pointer transition">Vault</li>
          <li className="hover:text-blue-400 cursor-pointer transition">About</li>
          <li className="hover:text-blue-400 cursor-pointer transition">Contact</li>
        </ul>
      )}
    </nav>
  );
}
