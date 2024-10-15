'use client'
import { useState } from 'react';
import { MenuIcon, ArrowDownIcon } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); 
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  return (
    <aside className={`h-screen bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-13'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className={`${isOpen ? 'block' : 'hidden'} text-xl font-semibold text-gray-900 dark:text-white transition-opacity`}>Dashboard</h1>
        <button
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon className="h-6 w-6 text-gray-900 dark:text-gray-400" />
        </button>
      </div>
      
      <nav className="mt-6">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span className={`${isOpen ? 'block' : 'hidden'} text-sm  text-gray-900 dark:text-white`}>
              Branches and Warehouses
            </span>
            <ArrowDownIcon className="h-4 w-4 text-gray-900 dark:text-gray-400" />
          </div>

          {dropdownOpen && isOpen && (
            <div className="pl-4 flex flex-col mt-2">
              <Link href="/dashboard/branches" className=" py-2 ps-3 text-gray-700 text-sm dark:text-gray-300 hover:text-green-500 dark:hover:text-green-300 rounded-md">
                Branches
              </Link>
              <Link href="/dashboard/warehouses" className=" py-2 ps-3 text-gray-700 text-sm dark:text-gray-300 hover:text-green-500 dark:hover:text-green-300 rounded-md">
                Warehouses
              </Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
