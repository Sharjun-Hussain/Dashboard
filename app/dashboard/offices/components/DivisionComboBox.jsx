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

export function DivisionComboBox({ division }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [fetchedDivisions, setfetchedDivisions] = React.useState([]);

  React.useEffect(() => {
    const fetchDivisions = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-divisions`,
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
        setfetchedDivisions(res.data.data);
      }
    };
    fetchDivisions();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="select"
          role="combobox"
          aria-expanded={open}
          className=" justify-between w-full m-0"
        >
          {value
            ? fetchedDivisions.find((division) => division.name === value)?.name
            : "Select Division"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          {/* <CommandInput placeholder="Search framework..." /> */}
          <CommandList className="flex justify-start ">
            <CommandEmpty>No Divisions found.</CommandEmpty>
            <CommandGroup
              className="flex m-0 p-0 
            "
            >
              {fetchedDivisions.map((division) => (
                <CommandItem
                  className=""
                  key={division.id}
                  value={division.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    division(division.name);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === division.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {division.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
