"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

export function WarehouseCompoBox({
  warehousedata,
  warehouseid,
  warhouseName,
  name,
  disable,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disable}
          variant="select"
          role="combobox"
          aria-expanded={open}
          className="lg:w-[200px] w-full justify-between m-0"
        >
          {value
            ? `${
                warehousedata.find((office) => office.warehouse_name === value)
                  ?.warehouse_name
              }`
            : name
            ? name
            : "Select Warehouse..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Warehouse..." />
          <CommandList>
            <CommandEmpty>No Warehouse found.</CommandEmpty>
            <CommandGroup>
              {warehousedata.map((office) => (
                <CommandItem
                  key={office.id}
                  value={office.warehouse_name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    warehouseid(office.id);

                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === office.warehouse_name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {office.warehouse_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
