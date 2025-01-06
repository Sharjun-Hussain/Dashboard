"use client";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/Custom/Breadcrumb/Breadcrumbs";
import Link from "next/link";

import {
  Bookmark,
  ChartNoAxesColumn,
  ChevronDownIcon,
  DiamondMinus,
  LayoutList,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CustomCard from "../components/Custom/Card/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";
import { hasPermissions } from "@/lib/PermissionChecker";
import { useSession } from "next-auth/react";

const Layout = ({ children }) => {
  const { data: usersession } = useSession();
  const [UserPermissions, setUserPermissions] = useState([]);
  useEffect(() => {
    setUserPermissions(usersession.user.permissions);
  }, []);
  const canManageProduct = hasPermissions(UserPermissions, "Product", [
    "Index",
    "Create",
    "Update",
    "Delete",
  ]);
  const currentpath = usePathname();

  const Inventory_Control_Links = [
    {
      name: "Add Stock",
      Url: "/dashboard/assets/add-stock",
    },
    {
      name: " Issue Stock",
      Url: "/dashboard/assets/issue-stock",
    },
  ];

  const Master_Products_Link = [
    {
      name: "Add New Product",
      Url: "/dashboard/assets/add-product",
    },
    {
      name: "Add New Main Category",
      Url: "/dashboard/assets/main-category",
    },
    {
      name: "Add New Sub Category",
      Url: "/dashboard/assets/sub-category",
    },
    {
      name: "Add Unit Type",
      Url: "/dashboard/assets/unit-type",
    },
  ];

  const Report_Link = [
    {
      name: "Product Summary",
      Url: "/dashboard/assets/report/products",
    },
    {
      name: "Stock In Summary",
      Url: "/dashboard/assets/report/products/in",
    },
    {
      name: "Stock Out Summary",
      Url: "/dashboard/assets/report/products/out",
    },
  ];
  return (
    <div>
      <Breadcrumbs />
      <div className="flex rounded-lg justify-between">
        <CustomCard className="w-full h-full p-0">
          <div className="flex">
            {/* Sidebar section */}
            <div className="w-[25%] hidden lg:flex p-1 px-2  flex-col rounded-lg dark:bg-transparent space-y-4">
              {/* Main heading */}
              <Link href="/dashboard/assets">
                {" "}
                <h2 className="font-bold text-xl mb-4 text-gray-800 dark:text-white">
                  Dashboard
                </h2>
              </Link>

              {/* Inventory Control Accordion */}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="w-full flex justify-between items-center p-2 space-x-2 hover:bg-gray-200 dark:hover:bg-primary transition duration-200 ease-in-out rounded-lg">
                    <div className="flex items-center">
                      <ChartNoAxesColumn size={20} strokeWidth={2} />
                      <span className="font-bold ms-2">Inventory Control</span>
                    </div>
                    <ChevronDownIcon className="h-4 w-4 ms-auto shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionTrigger>
                  <AccordionContent className="ms-3 space-y-2">
                    {Inventory_Control_Links.map((items) => {
                      return (
                        <Link
                          key={items.Url}
                          className={`flex text-sm p-1  rounded-md ${
                            currentpath === items.Url
                              ? "text-pink-600"
                              : "dark:text-gray-300 hover:text-pink-600"
                          } transition-colors duration-200 ease-in-out`}
                          href={items.Url}
                        >
                          {items.name}
                        </Link>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Master Products Accordion */}
              {canManageProduct ? (
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="w-full flex justify-between items-center p-2 space-x-2 hover:bg-gray-200 dark:hover:bg-primary transition duration-200 ease-in-out rounded-lg">
                      <div className="flex items-center">
                        <Bookmark size={20} strokeWidth={2} />
                        <span className="font-bold ms-2">Master Products</span>
                      </div>
                      <ChevronDownIcon className="h-4 w-4 ms-auto shrink-0 text-muted-foreground transition-transform duration-200" />
                    </AccordionTrigger>
                    <AccordionContent className="ms-2 space-y-2">
                      {Master_Products_Link.map((items) => {
                        return (
                          <Link
                            key={items.Url}
                            className={`flex text-sm p-1 rounded-md ${
                              currentpath === items.Url
                                ? "text-pink-600"
                                : "dark:text-gray-300 hover:text-pink-600"
                            } transition-colors duration-200 ease-in-out`}
                            href={items.Url}
                          >
                            {items.name}
                          </Link>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : null}

              {/* Report Link */}

              <Accordion type="single" collapsible>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="w-full flex justify-between items-center p-2 space-x-2 hover:bg-gray-200 dark:hover:bg-primary transition duration-200 ease-in-out rounded-lg">
                    <div className="flex items-center">
                      <LayoutList className="me-2" size={20} strokeWidth={2} />
                      <span className="font-bold ">Reports</span>
                    </div>
                    <ChevronDownIcon className="h-4 w-4 ms-auto shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionTrigger>
                  <AccordionContent className="ms-3 space-y-2">
                    {Report_Link.map((items) => {
                      return (
                        <Link
                          key={items.Url}
                          className={`flex text-sm p-1 rounded-md ${
                            currentpath === items.Url
                              ? "text-pink-600"
                              : "dark:text-gray-300 hover:text-pink-600"
                          } transition-colors duration-200 ease-in-out`}
                          href={items.Url}
                        >
                          {items.name}
                        </Link>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <Separator orientation="vertical" />

            {/* Main Content Section */}
            <div className=" w-full dark:bg-accent rounded-lg">{children}</div>
          </div>
        </CustomCard>
      </div>
    </div>
  );
};

export default Layout;
