"use client";
import { Input } from "@/components/ui/input";
import { Bell, Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";


const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const {data:userSession} = useSession()

  // Ensure that the component only renders after the client has mounted
  useEffect(() => {
    setMounted(true);
  }, []);


  

  if (!mounted) {
    // Prevents mismatching during SSR and hydration
    return (
      <div>
        <div className=" w-full  py-8 bg-[#F8D7DA] h-[50px]  flex items-center">
          <div className="ms-3">
            <Skeleton className="h-12 bg-secondary w-12 rounded-full" />
          </div>
          <div className="ms-auto flex items-center">
            <div className="mx-3">
              <Skeleton className="h-[35px] bg-secondary opacity-25  w-[190px] " />
            </div>
            <div className="ms-2">
              <Bell width={16} />{" "}
            </div>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex items-center justify-center p-2 hover:cursor-pointer"
            >
              <Skeleton className="h-4 bg-secondary w-4 rounded-full" />
              {/* {theme == "light" ? "Hello" : "h"} */}
            </button>
            <div className="mr-2 ">
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }



  return (
  userSession && 
      <div className=" w-full  py-8 dark:bg-[#1E1E1E]  bg-[#FDF2F4] h-[50px]  flex items-center">
      <div className="ms-3">Lgg</div>
      <div className="mx-auto"><p>Railway Department - Colombo </p></div>
      <div className="ms-auto flex items-center">
        <div className="mx-3">
          <Input
            className="border-none bg-transparent placeholder:text-gray-400 "
            placeholder="Search"
          ></Input>
        </div>
        <div className="ms-2">
          <Bell width={20} />{" "}
        </div>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="flex items-center justify-center p-2 hover:cursor-pointer"
        >
          {theme == "light" ? <Moon width={20} /> : <Sun width={20} />}
        </button>
        <div className="mr-2 flex items-center ring-pink-600 justify-start border-primary border rounded-full px-2 py-1 hover:bg-secondary hover:cursor-pointer ">
          <Avatar className="w-7 h-7">
            <AvatarImage src="#" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[12px] font-bold mx-1">{userSession?.user?.name}</p>
            <p className="text-[11px] -mt-1 mx-1">{userSession?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
    
   
  );
};

export default Header;
