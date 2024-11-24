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

  const Inventory_Control_Links = [
    {
      name: "Add Stock",
      Url: "/dashboard/goods/add-stock",
    },
    {
      name: " Issue Stock",
      Url: "/dashboard/goods/issue-stock",
    },
  ];

  const Master_Products_Link = [
    {
      name: "Add New Product",
      Url: "/dashboard/goods/add-product",
    },
    {
      name: "Add New Main Category",
      Url: "/dashboard/goods/main-category",
    },
    {
      name: "Add New Sub Category",
      Url: "/dashboard/goods/sub-category",
    },
    {
      name: "Add Unit Type",
      Url: "/dashboard/goods/unit-type",
    },
  ];


  const Report_Link = [
    {
      name: "Product Summary",
      Url: "/dashboard/goods/report/products",
    },
    {
      name: "Product In Summary",
      Url: "/dashboard/goods/report/products/in",
    },
    {
      name: "Product Out Summary",
      Url: "/dashboard/goods/report/products/out",
    },
  ]
  return (
    <div>
      <Breadcrumbs />
      <div className="flex rounded-lg justify-between">
        <CustomCard className="w-full h-full p-0">
          <div className="flex">
            {/* Sidebar section */}
            <div className="w-[25%] hidden lg:flex p-1 px-2  flex-col rounded-lg dark:bg-transparent space-y-4">
              {/* Main heading */}
              <Link href="/dashboard/goods">
                {" "}
                <h2 className="font-bold text-xl mb-4 text-gray-800 dark:text-white">
                  Dashboard
                </h2>
              </Link>

              {/* Inventory Control Accordion */}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="w-full flex justify-between items-center p-2 space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 ease-in-out rounded-lg">
                    <div className="flex items-center">
                      <DiamondMinus size={20} strokeWidth={2} />
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
              <Accordion type="single" collapsible>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="w-full flex justify-between items-center p-2 space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 ease-in-out rounded-lg">
                    <div className="flex items-center">
                      <DiamondMinus size={20} strokeWidth={2} />
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

              {/* Report Link */}


              <Accordion type="single" collapsible>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="w-full flex justify-between items-center p-2 space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 ease-in-out rounded-lg">
                    <div className="flex items-center">
                      <DiamondMinus size={20} strokeWidth={2} />
                      <span className="font-bold ms-2">Reports</span>
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
              <Link
                className={`font-bold flex py-3 pe-3 ms-2 text-sm ${
                  currentpath === "/dashboard/goods/unit-type"
                    ? "text-pink-600"
                    : "dark:text-gray-300 hover:text-pink-600"
                } transition-colors duration-200 ease-in-out`}
                href="/dashboard/goods/add-product"
              >
                <LayoutList className="me-2" size={20} strokeWidth={2} /> Report
              </Link>
            </div>

            <Separator orientation="vertical" />

            {/* Main Content Section */}
            <div className=" p-3 w-full dark:bg-accent rounded-lg">
              {children}
            </div>
          </div>
        </CustomCard>
      </div>
    </div>
  );
};

export default Layout;
