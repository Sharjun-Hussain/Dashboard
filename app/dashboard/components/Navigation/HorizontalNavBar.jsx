"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import axios from "axios";
import { useSession } from "next-auth/react";
import { hasPermissions } from "@/lib/PermissionChecker";

export function Navbar() {
  const { data } = useSession();
  const [MainCategory, setMainCategory] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const [UserPermissions, setUserPermissions] = React.useState([]);
  React.useEffect(() => {
    const fetchMainCategory = async () => {
      setloading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/MainCategory`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withXSRFToken: true,
          withCredentials: true,
        }
      );

      if (res.status == 200) {
        setMainCategory(res.data.data);
        setloading(false);
      }
    };
    fetchMainCategory();
  }, []);

  React.useEffect(() => {
    setUserPermissions(data.user.permissions);
  }, []);

  const canViewOffices = hasPermissions(UserPermissions, "Office", ["Index"]);
  const canManageAssets = hasPermissions(UserPermissions, "Product", ["Index"]);
  const canViewWarehouses = hasPermissions(UserPermissions, "Warehouse", [
    "Index",
  ]);
  const canViewRoles = hasPermissions(UserPermissions, "Role", ["Index"]);

  return (
    <div className="flex justify-center mt-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {canManageAssets ? (
            <NavigationMenuItem>
              <Link href="/dashboard/assets" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Assets Management
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ) : null}

          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>Assets</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {MainCategory?.map((component) => (
                  <ListItem
                    key={component.name}
                    title={component.name}
                    href={`/dashboard/assets/category/${component.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          {canViewOffices ? (
            <NavigationMenuItem>
              <Link href="/dashboard/offices" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Offices
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ) : null}
          {canViewWarehouses ? (
            <NavigationMenuItem>
              <Link href="/dashboard/warehouses" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Warehouses
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ) : null}

          {canViewRoles ? (
            <NavigationMenuItem>
              <Link href="/dashboard/roles" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  User and Roles
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ) : null}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
