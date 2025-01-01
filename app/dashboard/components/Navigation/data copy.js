import { Factory, HardDrive, LayoutGrid, School } from "lucide-react";

export const SubNavItems = [
  {
    Name: "Dashboard",
    Path: "/dashboard",
    Icon: <LayoutGrid width={17} className="text-pink-600  dark:text-white" />,
  },
  {
    Name: "Goods & Items",
    Path: "/dashboard/goods",
    Icon: <HardDrive width={17} className="text-pink-600  dark:text-white" />,
    Dropdown: true,
    SubItems: [
      { Name: "Electronics", Path: "/goods/electronics" },
      { Name: "Clothing", Path: "/goods/clothing" },
    ],
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
  ,
  {
    Name: "User Roles",
    Path: "/dashboard/roles",
    Icon: <HardDrive width={14} className="text-pink-600  dark:text-white" />,
  },
];
