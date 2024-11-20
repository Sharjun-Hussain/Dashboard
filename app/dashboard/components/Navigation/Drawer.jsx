import * as React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { NavItems } from "./data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function DrawerDemo() {
  const [goal, setGoal] = React.useState(350);

  return (
    <Sheet>
      <SheetTrigger asChild>
       
          <Menu size={18} />
       
      </SheetTrigger>
      <SheetContent className="w-[200px]">
        <SheetHeader>
          <SheetTitle className="text-sm my-9">Inventory Dashboard</SheetTitle>
          <SheetDescription className="items-center h-full">
            <div className="flex flex-col items-center  justify-end space-y-2">
              {NavItems.map((item) => {
                return (
                  <div key={item.Path} className="flex-1 w-full   ">
                    <Link
                      href={item.Path}
                      className="text-gray-800 flex space-x-1  dark:text-slate-200 hover:text-gray-500"
                    >
                      {item.Icon}
                      <span>{item.Name}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
