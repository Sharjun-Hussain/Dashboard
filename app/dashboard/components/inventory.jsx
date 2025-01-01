// components/ElegantCardComponent.js
"use client";
import { useState } from "react";

export default function ElegantCardComponent() {
  const [assets, setAssets] = useState([
    { id: 1, name: "Train Engine A", type: "Locomotive", status: "Active" },
    { id: 2, name: "Cargo Wagon B", type: "Wagon", status: "Inactive" },
    {
      id: 3,
      name: "Train Engine C",
      type: "Locomotive",
      status: "Maintenance",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8">
          Asset Management
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform transition duration-300 hover:scale-105"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 text-white">
                <h2 className="text-xl font-semibold">{asset.name}</h2>
                <p className="text-sm">{asset.type}</p>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm font-semibold ${
                      asset.status === "Active"
                        ? "text-green-500"
                        : asset.status === "Inactive"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {asset.status}
                  </span>

                  <div className="space-x-4">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-all duration-200">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition-all duration-200">
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-gray-100 dark:bg-gray-600 p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: 2 days ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
