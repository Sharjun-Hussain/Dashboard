// components/Navbar.js
"use client";
import Link from "next/link";
import { NavItems } from "./data";
import useMediaQuery from "@/Hooks/useMediaQuery";
import { DrawerDemo } from "./Drawer";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const path = usePathname();

  return (
    <>
      {!isMobile && (
        <header className="bg-white w-[700px] rounded-full mx-auto mt-3  dark:bg-accent shadow-md">
          <div className="container  mx-auto flex justify-center h-14 items-center  px-6">
            {/* Navigation Links */}
            <nav className="flex">
              {NavItems.map((item) => {
                const isActive = path === item.Path;
                return (
                  <div
                    key={item.Path}
                    className="flex mx-1 hover:text-pink-600"
                  >
                    <Link
                      href={item.Path}
                      className={`text-gray-800 items-center flex text-xs font-medium space-x-1 hover:text-pink-600 p-2 rounded-full px-4 hover:bg-secondary ${
                        isActive ? "hover:bg-primary" : ""
                      } dark:text-slate-200 hover:text-gray-500`}
                    >
                      {item.Icon}
                      <span>{item.Name}</span>
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>
        </header>
      )}

      {isMobile && <DrawerDemo />}
    </>
  );
}
