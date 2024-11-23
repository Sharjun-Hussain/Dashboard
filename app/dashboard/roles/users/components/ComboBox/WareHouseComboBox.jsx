"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import axios from "axios"

export function WareHouseComboBox({ warehouseid, name, disabled, data, selectedOffice }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [fetchedWareHouses, setFetchedWareHouses] = React.useState([]);

  // Fetch warehouses when the office changes
  React.useEffect(() => {
    if (!selectedOffice) return; // Don't fetch if no office is selected

    const fetchWarehouse = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-warehouse/${selectedOffice}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withXSRFToken: true,
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setFetchedWareHouses(res.data.data); // Update warehouse data based on office
        }
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };
    
    fetchWarehouse();
  }, [selectedOffice]); // Re-run when selected office changes

  const selectedWarehouseName = fetchedWareHouses.find((warehouse) => warehouse.warehouse_name === value)?.warehouse_name;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="select"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between m-0"
          disabled={disabled}
        >
          {value
            ? selectedWarehouseName
            : "Select Warehouse"} {/* Default text if no warehouse is selected */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search warehouse..." />
          <CommandList>
            {fetchedWareHouses.length === 0 ? (
              <CommandEmpty>No warehouses available.</CommandEmpty>
            ) : (
              <CommandGroup>
                {fetchedWareHouses.map((warehouse) => (
                  <CommandItem
                    key={warehouse.id}
                    value={warehouse.warehouse_name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue); // Toggle selection
                      warehouseid(warehouse.id); // Pass selected warehouse ID
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === warehouse.warehouse_name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {warehouse.warehouse_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
