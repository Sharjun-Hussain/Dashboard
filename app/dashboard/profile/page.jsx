"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [image, setImage] = useState("/default-avatar.png");

  // Check and apply theme on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentTheme = localStorage.getItem("theme") || "light";
      setTheme(currentTheme);
      document.documentElement.classList.add(currentTheme);
    }
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      {/* Light/Dark Mode Toggle */}

      <div className="flex flex-col justify-center items-center h-full p-5">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="mt-3"
            onChange={handleImageChange}
          />
        </div>

        {/* User Info Section */}
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            John Doe
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Software Developer</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            johndoe@example.com
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
            Edit Profile
          </button>
          <button className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
