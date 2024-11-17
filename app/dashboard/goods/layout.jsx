import React from "react";
import Breadcrumbs from "../components/Custom/Breadcrumb/Breadcrumbs";
import sideBar from "./sideBar";
import Link from "next/link";
import {
  DiamondMinus,
  DiamondPlus,
  LayoutList,
  Minus,
  Plus,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CustomCard from "../components/Custom/Card/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const layout = ({ children }) => {
  return (
    <div>
      <Breadcrumbs />
      <div className="flex  rounded-lg justify-between ">
        <CustomCard className=" w-full h-full p-0">
          <div className="flex space-x-4 ">
            <div className=" w-[20%] flex flex-col ps-4 rounded-lg  bg-gray-400 dark:bg-transparent">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    {" "}
                    <DiamondMinus
                      className="me-2"
                      size={20}
                      strokeWidth={3}
                    />{" "}
                    Stock Details
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      className="font-bold flex  px-3 text-sm "
                      href="/dashboard/goods/main-category"
                    >
                      {" "}
                     - Main Category
                    </Link>
                  </AccordionContent>
                  <AccordionContent>
                    <Link
                      className="font-bold flex  px-3 text-sm "
                      href="/dashboard/goods/sub-category"
                    >
                      {" "}
                     - Sub Category
                    </Link>
                  </AccordionContent>
                  <AccordionContent>
                    <Link
                      className="font-bold flex px-3 text-sm "
                      href="/dashboard/goods/issue-stock"
                    >
                      {" "}
                    - Issue Stock
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Link
                className="font-bold flex  py-3 pe-3 text-sm hover:dark:bg-secondary"
                href="/dashboard/goods/add-product"
              >
                <LayoutList className="me-2" size={20} strokeWidth={3} /> Add
                Inventory
              </Link>
              <Link
                className="font-bold flex  py-3 pe-3 text-sm hover:dark:bg-secondary"
                href="/dashboard/goods/add-stock"
              >
                <DiamondPlus className="me-2" size={20} strokeWidth={3} /> Add
                Stock
              </Link>
              <Link
                className="font-bold flex  py-3 pe-3 text-sm hover:dark:bg-secondary"
                href="/dashboard/goods/issue-stock"
              >
                <DiamondMinus className="me-2" size={20} strokeWidth={3} />{" "}
                Issue Stock
              </Link>
            </div>
            <Separator orientation="vertical" />
            <div className=" p-3 w-full  dark:bg-accent rounded-lg ">
              {children}
            </div>
          </div>
        </CustomCard>
      </div>
    </div>
  );
};

export default layout;
