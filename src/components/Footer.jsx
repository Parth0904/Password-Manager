import React from "react";

export default function FooterSimple() {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg
            className="w-6 h-6 text-blue-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2l8 4v5c0 5-3.58 9.74-8 11-4.42-1.26-8-6-8-11V6l8-4z"
              fill="currentColor"
            />
          </svg>
          <span className="font-semibold text-gray-200">SecureVault</span>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm text-center md:text-left">
          <a className="hover:text-blue-400 transition">Privacy</a>
          <a className="hover:text-blue-400 transition">Terms</a>
          <a className="hover:text-blue-400 transition">Support</a>
        </div>

        {/* Social */}
        <div className="flex gap-4">
          <a className="hover:text-blue-400 transition">GitHub</a>
          <a className="hover:text-blue-400 transition">Twitter</a>
        </div>
      </div>

      <div className="text-center text-xs py-3 border-t border-gray-800 text-gray-500">
        © {new Date().getFullYear()} SecureVault. All Rights Reserved.
      </div>
    </footer>
  );
}
