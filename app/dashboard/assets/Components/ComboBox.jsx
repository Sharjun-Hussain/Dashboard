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

export function Combobox({ Officeid, name, officedata }) {
  const [open, setOpen] = React.useState(false);
  const [selectedOffice, setSelectedOffice] = React.useState(officedata);
  const [fetchedOffices, setFetchedOffices] = React.useState([]);

  React.useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/office`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withXSRFToken: true,
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setFetchedOffices(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch offices:", error);
      }
    };
    fetchOffices();
  }, []);

  // Function to get display text for the selected office
  const getDisplayText = () => {
    if (!selectedOffice) {
      return name || "Select office...";
    }

    const foundOffice = fetchedOffices.find((office) =>
      typeof selectedOffice === "number"
        ? office.id === selectedOffice
        : office.office_name === selectedOffice
    );

    if (foundOffice) {
      return `${foundOffice.code} - ${foundOffice.office_name}`;
    }

    return name || "Select office...";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="select"
          role="combobox"
          aria-expanded={open}
          className="lg:w-[200px] w-full justify-between m-0"
        >
          {getDisplayText()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search office..." />
          <CommandList>
            <CommandEmpty>No Office found.</CommandEmpty>
            <CommandGroup>
              {fetchedOffices.map((office) => (
                <CommandItem
                  key={office.id}
                  value={office.office_name}
                  onSelect={() => {
                    setSelectedOffice(office.id);
                    Officeid(office.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedOffice === office.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {office.code} - {office.office_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
