"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const path = usePathname();
  const pathArray = path.split("/").filter(Boolean); // To avoid empty string for the root path

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {pathArray.map((item, index) => (
            <div key={item}>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${pathArray.slice(0, index + 1).join("/")}`}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < pathArray.length - 1 && (
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
              )}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
