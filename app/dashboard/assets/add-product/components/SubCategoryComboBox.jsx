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

export function SubCategoryComboBox({ categoryid, data }) {
  console.log(data);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [fetchedMainCategory, setfetchedMainCategory] = React.useState([]);
  const triggerRef = React.useRef(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const fetchMainCategories = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/Subcategory`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withXSRFToken: true,
          withCredentials: true,
        }
      );

      if (res.status == 200) {
        console.log(res.data);
        setfetchedMainCategory(res.data.data);
      }
    };
    fetchMainCategories();
  }, []);

  React.useEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div ref={triggerRef}>
          <Button
            type="button"
            variant="select"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between  m-0"
          >
            {value
              ? fetchedMainCategory.find(
                  (maincategory) => maincategory.name === value
                )?.code +
                " - " +
                fetchedMainCategory.find(
                  (maincategory) => maincategory.name === value
                )?.name
              : "Select Sub Category..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-[10px]" style={{ width: `${width}px` }}>
        <Command>
          {/* <CommandInput placeholder="Search framework..." /> */}
          <CommandList>
            <CommandEmpty>No Categories found.</CommandEmpty>
            <CommandGroup>
              {data?.map((category) => (
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
