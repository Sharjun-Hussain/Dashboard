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

export function FetchOfficeComboBox({ Officeid }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [FetchedOffices, setFetchedOffices] = React.useState([]);

  React.useEffect(() => {
    const fetchOffices = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-office`,
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
        setFetchedOffices(res.data.data);
      }
    };
    fetchOffices();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="select"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between m-0"
        >
          {value
            ? FetchedOffices.find((office) => office.office_name === value)
                ?.code +
              " - " +
              FetchedOffices.find((office) => office.office_name === value)
                ?.office_name
            : "Select office"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder="Search Office Branch" />
          <CommandList>
            <CommandEmpty>No Office found.</CommandEmpty>
            <CommandGroup>
              {FetchedOffices.map((office) => (
                <CommandItem
                  key={office.id}
                  value={office.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    Officeid(office.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === office.office_name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {office.office_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
