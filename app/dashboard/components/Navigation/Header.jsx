"use client";
import { Input } from "@/components/ui/input";
import { Bell, Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { Notification } from "../Notification/Notification";
import useMediaQuery from "@/Hooks/useMediaQuery";
import { DrawerDemo } from "./Drawer";
import axios from "axios";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: userSession } = useSession();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [officeData, setofficeData] = useState()

  // Function to handle the toggling of the notification dropdown
  const handleSetNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  console.log(userSession);
  

  useEffect(() => {
    
    const fetchOffice = async () => {
      
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/office/${userSession.user?.officeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withXSRFToken: true,
          withCredentials: true,
        }
      );

      if (res.status == 200) {
        console.log(res.data.data);
        setofficeData(res.data.data);
        
      }
    };
    fetchOffice();
   
  }, [])
  
  // Ensure that the component only renders after the client has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevents mismatching during SSR and hydration
    return (
      <div>
        <div className="w-full py-8 bg-[#F8D7DA] h-[50px] flex items-center">
          <div className="ms-3">
            <Skeleton className="h-12 bg-secondary w-12 rounded-full" />
          </div>
          <div className="ms-auto flex items-center">
            <div className="mx-3">
              <Skeleton className="h-[35px] bg-secondary opacity-25 w-[190px]" />
            </div>
            <div className="ms-2">
              <Bell width={16} />
            </div>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex items-center justify-center p-2 hover:cursor-pointer"
            >
              <Skeleton className="h-4 bg-secondary w-4 rounded-full" />
            </button>
            <div className="mr-2">
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    userSession && (
      <div className="w-full flex  dark:bg-[#1E1E1E] bg-[#FDF2F4] h-[50px] md:flex items-center">
        <div className="ms-3">{isMobile && <DrawerDemo/>}</div>
        <div className="ms-3">Logo</div>
        <div className="mx-auto hidden md:flex">
          <p>Railway Department - {officeData?.office_name}</p>
        </div>
        <div className="ms-auto flex items-center">
        
          <div className="ms-2 relative hover:cursor-pointer">
            <Bell onClick={handleSetNotification} width={20} />
            <Notification
              className={`absolute ${
                notificationOpen ? "" : "hidden"
              } top-0  right-7`}
            />
          </div>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="flex items-center justify-center p-2 hover:cursor-pointer"
          >
            {theme === "light" ? <Moon width={20} /> : <Sun width={20} />}
          </button>
          <div className="mr-2 flex items-center ring-pink-600 justify-start border-primary border rounded-full px-2 py-1 hover:bg-secondary hover:cursor-pointer">
            <Avatar className="w-7 h-7">
              <AvatarImage src="#" />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div className="hidden md:flex md:flex-col">
              <p className="text-[12px] font-bold mx-1">
                {userSession?.user?.name}
              </p>
              <p className="text-[11px] -mt-1 mx-1">
                {userSession?.user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Header;
