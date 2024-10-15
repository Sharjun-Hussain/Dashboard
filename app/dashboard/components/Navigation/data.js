import { Factory, HardDrive, LayoutGrid, School } from "lucide-react";

export const NavItems = [
  {
    Name: "Dashboard",
    Path: "/dashboard",
    Icon: <LayoutGrid width={17} className="text-pink-600  dark:text-white" />,
  },
  {
    Name: "Offices",
    Path: "/dashboard/offices",
    Icon: <School width={17} className="text-pink-600  dark:text-white" />,
  },
  {
    Name: "Warehouses",
    Path: "/dashboard/warehouses",
    Icon: <Factory width={17} className="text-pink-600  dark:text-white" />,
  },
  {
    Name: "Goods",
    Path: "/dashboard/income-goods",
    Icon: <HardDrive width={17} className="text-pink-600  dark:text-white" />,
  },{
    Name: "User Roles",
    Path: "/dashboard/roles",
    Icon: <HardDrive width={14} className="text-pink-600  dark:text-white" />,
  },
];
