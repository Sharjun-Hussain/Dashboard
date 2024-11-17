import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-black   px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50  dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:border-gray-100 dark:text-white text-black  bg-transparent dark:border-gray-400 dark:bg-transparent ",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
