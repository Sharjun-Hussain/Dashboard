"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export function DeletePopUp({ text }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const items = [
    {
      id: "store meterial",
      label: "Store Materials",
    },
    {
      id: "inventory meterial",
      label: "Inventory Materials",
    },
  ];

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">{text}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{text}</DialogTitle>
          <DialogDescription className="mb-3">
            Once you {text}, there is no going back. Please be certain.
          </DialogDescription>
          {text === "Delete All Stocks" && (
            <div>
              {items.map((item) => (
                <div key={item.id} className="flex items-center my-2 space-x-2">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleCheckboxChange(item.id)}
                  />
                  <label>{item.label}</label>
                </div>
              ))}
            </div>
          )}
          <Button
            variant="destructive"
            onClick={() => console.log(selectedItems)}
          >
            {text}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
