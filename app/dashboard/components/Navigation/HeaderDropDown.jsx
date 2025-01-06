import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function HeaderDropDownMenu({ Component }) {
  const { data } = useSession();
  const [OfficeName, setOfficeName] = useState(
    data.user.office ? data.user.office?.office_name : ""
  );
  const [WarehouseName, setWarehouseName] = useState(
    data.user.warehouse ? data.user.warehouse?.warehouse_name : ""
  );
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    setOfficeName(data.user.office ? data.user.office?.office_name : "");
    setWarehouseName(
      data.user.warehouse ? data.user.warehouse?.warehouse_name : ""
    );
  }, []);

  console.log(OfficeName, WarehouseName);

  const handleSignout = async () => {
    try {
      await signOut({
        redirect: false,
      });

      toast.success("Logout Successfully!");
      localStorage.removeItem("token");
      localStorage.removeItem("office_name");
      localStorage.removeItem("office_id");
      localStorage.removeItem("office_code");
      localStorage.removeItem("warehouse_name");
      localStorage.removeItem("warehouse_id");
      localStorage.removeItem("warehouse_code");

      // Redirect to login page after successful logout
      router.push("/login"); // Redirect to login page
    } catch (err) {
      console.error(err);
      toast.error(
        "Something went wrong! Please check your internet connection."
      );
    } finally {
      // Reset loading state if necessary
      // setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{Component}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard/profile">
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings">
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup> */}

        <DropdownMenuSeparator />
        {OfficeName && (
          <DropdownMenuItem>Branch : {OfficeName}</DropdownMenuItem>
        )}
        {WarehouseName && (
          <DropdownMenuItem>Warehouse : {WarehouseName}</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
