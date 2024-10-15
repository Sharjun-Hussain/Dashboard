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

export function DrawerDemo() {
  const [goal, setGoal] = React.useState(350);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent className="w-[160px]">
        <SheetHeader>
          <SheetTitle>Dashboard</SheetTitle>
          <SheetDescription>
            <div className="flex flex-col items-start justify-end space-y-2">
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
