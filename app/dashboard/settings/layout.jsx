"use client";
import React from "react";
import Breadcrumbs from "../components/Custom/Breadcrumb/Breadcrumbs";
import Link from "next/link";
import { BookText, Grid, Key, LayoutList } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CustomCard from "../components/Custom/Card/card";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const currentpath = usePathname();

  return (
    <div>
      <Breadcrumbs />
      <div className="flex rounded-lg justify-between">
        <CustomCard className="w-full h-full p-0">
          <div className="flex">
            {/* Sidebar section */}
            <div className="w-[25%] p-1 px-2 flex flex-col rounded-lg dark:bg-transparent space-y-4">
              {/* Main heading */}
              <Link href="/dashboard/settings">
                {" "}
                <h2 className="font-bold text-xl mb-4 text-gray-800 dark:text-white">
                  Settings
                </h2>
              </Link>

              {/* <Link
                className={`font-bold flex  pe-3 ms-2 text-sm ${
                  currentpath === "/dashboard/settings/general"
                    ? "text-pink-600"
                    : "dark:text-gray-300 hover:text-pink-600"
                } transition-colors duration-200 ease-in-out`}
                href="/dashboard/settings/general"
              >
                <Grid className="me-2" size={20} strokeWidth={2} /> General
                Settings
              </Link> */}
              <Link
                className={`font-bold flex  pe-3 ms-2 text-sm ${
                  currentpath === "/dashboard/settings/footer"
                    ? "text-pink-600"
                    : "dark:text-gray-300 hover:text-pink-600"
                } transition-colors duration-200 ease-in-out`}
                href="/dashboard/settings/footer"
              >
                <BookText className="me-2" size={20} strokeWidth={2} /> Footer
                Settings
              </Link>
              <Link
                className={`font-bold flex  pe-3 ms-2 text-sm ${
                  currentpath === "/dashboard/settings/api"
                    ? "text-pink-600"
                    : "dark:text-gray-300 hover:text-pink-600"
                } transition-colors duration-200 ease-in-out`}
                href="/dashboard/settings/api"
              >
                <Key className="me-2" size={20} strokeWidth={2} /> Custom API
              </Link>
              <Link
                className={`font-bold flex  pe-3 ms-2 text-sm ${
                  currentpath === "/dashboard/settings/critical"
                    ? "text-pink-600"
                    : "dark:text-gray-300 hover:text-pink-600"
                } transition-colors duration-200 ease-in-out`}
                href="/dashboard/settings/critical"
              >
                <Key className="me-2" size={20} strokeWidth={2} /> Critical
                Settings
              </Link>
            </div>

            <Separator orientation="vertical" />

            {/* Main Content Section */}
            <div className="p-3 w-full dark:bg-accent rounded-lg">
              {children}
            </div>
          </div>
        </CustomCard>
      </div>
    </div>
  );
};

export default Layout;
