"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import axios from "axios"

export function RoleCombobox({ roleid, name }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [fetchedRoles, setFetchedRoles] = React.useState([]);

  React.useEffect(() => {
    const fetchRoles = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/roles`,
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
        setFetchedRoles(res.data.data);
      }
    };
    fetchRoles();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="select"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between m-0"
        >
          {value
            ? `${fetchedRoles.find((role) => role.name === value)?.name} `
            : name ? name : "Select Role..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search office..." />
          <CommandList>
            <CommandEmpty>No Office found.</CommandEmpty>
            <CommandGroup>
              {fetchedRoles.map((role) => (
                <CommandItem
                  key={role.id}
                  value={role.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    roleid(role.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === role.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {role.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
