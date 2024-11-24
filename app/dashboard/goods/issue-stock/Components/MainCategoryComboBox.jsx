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

export function MainCategoryComboBox({ CategoryName }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(CategoryName || ""); // Initialize with CategoryName if provided
  const [fetchedMainCategory, setFetchedMainCategory] = React.useState([]);

  React.useEffect(() => {
    // Only fetch categories if none are passed
    if (!CategoryName) {
      const fetchMainCategories = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-main-category`,
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
            setFetchedMainCategory(res.data.data);
          }
        } catch (error) {
          console.error("Failed to fetch main categories:", error);
        }
      };

      fetchMainCategories();
    }
  }, [CategoryName]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={CategoryName}
          variant="select"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full m-0"
        >
          {CategoryName
            ? CategoryName
            : value
            ? fetchedMainCategory.find(
                (mainCategory) => mainCategory.name === value
              )?.code +
              " - " +
              fetchedMainCategory.find(
                (mainCategory) => mainCategory.name === value
              )?.name
            : "Select Main Category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-[10px]">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No Categories found.</CommandEmpty>
            <CommandGroup>
              {fetchedMainCategory.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
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
