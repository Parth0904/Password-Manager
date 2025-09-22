import React, { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  ClipboardIcon,
  PencilSquareIcon,
  TrashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const Manager = () => {
  // Input fields
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showInput, setShowInput] = useState(false);

  // Saved passwords with lazy initialization from localStorage
  const [savedPasswords, setSavedPasswords] = useState(() => {
    const stored = localStorage.getItem("savedPasswords");
    return stored ? JSON.parse(stored) : [];
  });

  // Show/hide toggles for each saved password
  const [showSaved, setShowSaved] = useState(() => {
    const stored = localStorage.getItem("savedPasswords");
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed.map(() => false);
  });

  // Currently editing index
  const [editingIndex, setEditingIndex] = useState(null);

  // Toggle input field visibility
  const toggleShowInput = () => setShowInput(!showInput);

  // Save or update password
  const savePassword = () => {
    if (!website || !username || !password) return;

    let updatedPasswords;
    if (editingIndex !== null) {
      // Update existing password
      updatedPasswords = [...savedPasswords];
      updatedPasswords[editingIndex] = { website, username, password };
      setEditingIndex(null);
    } else {
      // Add new password
      updatedPasswords = [...savedPasswords, { website, username, password }];
      setShowSaved([...showSaved, false]); // add corresponding show toggle
    }

    setSavedPasswords(updatedPasswords);
    localStorage.setItem("savedPasswords", JSON.stringify(updatedPasswords));

    setWebsite("");
    setUsername("");
    setPassword("");
  };

  // Edit a password
  const editPassword = (index) => {
    const item = savedPasswords[index];
    setWebsite(item.website);
    setUsername(item.username);
    setPassword(item.password);
    setEditingIndex(index);
  };

  // Delete a password
  const deletePassword = (index) => {
    const filtered = savedPasswords.filter((_, i) => i !== index);
    setSavedPasswords(filtered);
    localStorage.setItem("savedPasswords", JSON.stringify(filtered));

    const updatedShow = showSaved.filter((_, i) => i !== index);
    setShowSaved(updatedShow);
  };

  // Copy password to clipboard
  const copyPassword = (pwd) => {
    navigator.clipboard.writeText(pwd);
    alert("Password copied!");
  };

  // Toggle visibility of a saved password
  const toggleShowSaved = (index) => {
    const updated = [...showSaved];
    updated[index] = !updated[index];
    setShowSaved(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_600px_at_50%_200px,#3b82f6,transparent)]"></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-400 drop-shadow-lg">
          🔐 Secure Password Manager
        </h1>

        {/* Input Form */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-6 sm:p-8 max-w-full sm:max-w-xl md:max-w-2xl mx-auto hover:shadow-blue-500/30 transition">
          <h2 className="text-xl font-semibold mb-6 text-gray-100">
            {editingIndex !== null ? "Edit Password" : "Add New Password"}
          </h2>
          <div className="space-y-5">
            <input
              type="text"
              placeholder="🌐 Website / App"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="👤 Username / Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <div className="relative flex items-center">
              <LockClosedIcon className="w-5 h-5 absolute left-3 text-gray-400" />
              <input
                type={showInput ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg bg-black/30 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
              <button
                onClick={toggleShowInput}
                className="absolute right-3 text-gray-400 hover:text-blue-400 transition"
              >
                {showInput ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            <button
              onClick={savePassword}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-500 hover:to-indigo-500 font-semibold shadow-md hover:shadow-blue-500/40 transition transform hover:scale-105"
            >
              {editingIndex !== null ? "Update Password" : "Save Password"}
            </button>
          </div>
        </div>

        {/* Saved Passwords */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-6 sm:p-8 max-w-full sm:max-w-xl md:max-w-2xl mx-auto mt-12 hover:shadow-blue-500/30 transition">
          <h2 className="text-xl font-semibold mb-6 text-gray-100">Saved Passwords</h2>
          <ul className="space-y-4 flex flex-col">
            {savedPasswords.map((item, index) => (
              <li
                key={index}
                className="bg-black/30 border border-white/10 p-5 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center hover:border-blue-400 transition gap-3"
              >
                <div>
                  <p className="font-semibold text-gray-100">{item.website}</p>
                  <p className="text-sm text-gray-400">{item.username}</p>
                  <p className="text-sm text-gray-400">
                    {showSaved[index] ? item.password : "••••••••"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-2 sm:mt-0">
                  <button
                    onClick={() => editPassword(index)}
                    className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black shadow-md hover:shadow-yellow-300/40 transition transform hover:scale-110"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => copyPassword(item.password)}
                    className="p-2 rounded-full bg-green-600 hover:bg-green-500 text-white shadow-md hover:shadow-green-400/40 transition transform hover:scale-110"
                  >
                    <ClipboardIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deletePassword(index)}
                    className="p-2 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-md hover:shadow-red-400/40 transition transform hover:scale-110"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => toggleShowSaved(index)}
                    className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-md hover:shadow-blue-400/40 transition transform hover:scale-110"
                  >
                    {showSaved[index] ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Manager;
