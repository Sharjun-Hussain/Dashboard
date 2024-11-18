"use client";
import React from "react";
import Breadcrumbs from "../components/Custom/Breadcrumb/Breadcrumbs";
import Link from "next/link";

import { ChevronDownIcon, DiamondMinus, LayoutList } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CustomCard from "../components/Custom/Card/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
              <Link href="/dashboard/goods">
                {" "}
                <h2 className="font-bold text-xl mb-4 text-gray-800 dark:text-white">
                 User Management
                </h2>
              </Link>

        
               

        
              <Link className={`font-bold flex  pe-3 ms-2 text-sm ${currentpath === "/dashboard/roles/permissions"
                          ? "text-pink-600"
                          : "dark:text-gray-300 hover:text-pink-600"
                      } transition-colors duration-200 ease-in-out`}
                href="/dashboard/roles/permissons"
              >
                <LayoutList className="me-2" size={20} strokeWidth={2} /> Permissions
              </Link>
              <Link className={`font-bold flex  pe-3 ms-2 text-sm ${currentpath === "/dashboard/roles/"
                          ? "text-pink-600"
                          : "dark:text-gray-300 hover:text-pink-600"
                      } transition-colors duration-200 ease-in-out`}
                href="/dashboard/roles/"
              >
                <LayoutList className="me-2" size={20} strokeWidth={2} /> Roles
              </Link>
              <Link className={`font-bold flex  pe-3 ms-2 text-sm ${currentpath === "/dashboard/roles/users"
                          ? "text-pink-600"
                          : "dark:text-gray-300 hover:text-pink-600"
                      } transition-colors duration-200 ease-in-out`}
                href="/dashboard/roles/users"
              >
                <LayoutList className="me-2" size={20} strokeWidth={2} /> Users
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
