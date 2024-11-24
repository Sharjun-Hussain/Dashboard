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

export function UnitTypeComboBox({ UnitType }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [FetchedUnitTypes, setFetchedUnitTypes] = React.useState([]);
  React.useEffect(() => {
    // Only fetch categories if none are passed
    if (!UnitType) {
      const fetchMainCategories = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-unitType`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              withXSRFToken: true,
              withCredentials: true,
            }
          );

          if (res.status === 200) {
            console.log(res.data);
            setFetchedUnitTypes(res.data.data);
          }
        } catch (error) {
          console.error("Failed to fetch main categories:", error);
        }
      };

      fetchMainCategories();
    }
  }, [UnitType]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="select"
          role="combobox"
          disabled={UnitType}
          aria-expanded={open}
          className="w-full justify-between  m-0"
        >
          {UnitType
            ? UnitType
            : value
            ? FetchedUnitTypes.find((maincategory) => maincategory.name === value)?.name
            : "Select Unit Type..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-[10px]">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No Unit Types found.</CommandEmpty>
            <CommandGroup>
              {FetchedUnitTypes?.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    categoryid(category.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
