"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import axios from "axios"

export function WareHouseComboBox({ warehouseid, name , disabled }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [fetchedWareHouses, setFetchedWareHouses] = React.useState([]);

  React.useEffect(() => {
    const fetchWarehouse = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/warehouse`,
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
        setFetchedWareHouses(res.data.data);
      }
    };
    fetchWarehouse();
  }, []);

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
            ? `${fetchedWareHouses.find((office) => office.warehouse_name === value)?.warehouse_name}`
            : name ? name : "Select Warehouse..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search office..." />
          <CommandList>
            <CommandEmpty>No WareHouse found.</CommandEmpty>
            <CommandGroup>
              {fetchedWareHouses.map((warehouse) => (
                <CommandItem
                  key={warehouse.id}
                  value={warehouse.warehouse_name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    warehouseid(warehouse.id)
                    setOpen(false)
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
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
