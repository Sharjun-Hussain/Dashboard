import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
// Assuming you are using react-toastify for toast notifications

export function RolesAddSheet({
  onUpdate,
  openSheet,
  setOpenSheet,
  existingRole,
}) {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState({});
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [Role, setRole] = useState(existingRole ? existingRole.name : "");

  useEffect(() => {
    const fetchPermissions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/permission`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.status === 200) {
          const grouped = res.data.data.reduce((acc, perm) => {
            const group = perm.group_name || "Ungrouped";
            if (!acc[group]) acc[group] = [];
            acc[group].push(perm);
            return acc;
          }, {});
          setPermissions(grouped);

          // Pre-select permissions if updating an existing role
          if (existingRole) {
            const preSelected = existingRole.permissions.map(
              (perm) => perm.name
            );
            setSelectedPermissions(preSelected);
          }
        }
      } catch (error) {
        console.error("Failed to fetch permissions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [existingRole]);

  const handlePermissionToggle = (permName) => {
    setSelectedPermissions((prev) =>
      prev.includes(permName)
        ? prev.filter((name) => name !== permName)
        : [...prev, permName]
    );
  };

  const handleGroupToggle = (group) => {
    const groupPermissions = permissions[group].map((perm) => perm.name);
    const allSelected = groupPermissions.every((name) =>
      selectedPermissions.includes(name)
    );

    setSelectedPermissions((prev) =>
      allSelected
        ? prev.filter((name) => !groupPermissions.includes(name))
        : [...prev, ...groupPermissions.filter((name) => !prev.includes(name))]
    );
  };

  const isGroupSelected = (group) => {
    return permissions[group].every((perm) =>
      selectedPermissions.includes(perm.name)
    );
  };

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = existingRole
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/roles/${existingRole.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/roles`;
      const method = existingRole ? "put" : "post";

      const res = await axios({
        method,
        url,
        data: {
          name: Role,
          permissions: selectedPermissions,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === (existingRole ? 200 : 201)) {
        toast("Role Updated Successfully", {
          duration: 1600,
          position: "top-right",
        });
        onUpdate(res.data.data);
        setRole("");
        setSelectedPermissions([]);
      }
    } catch (err) {
      toast.error("Failed to save role.", {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent className="w-full md:min-w-[85vw] overflow-y-auto">
        <div className="flex flex-col mb-6">
          <h1 className="text-xl font-bold">
            {existingRole ? "Update Role" : "Create Role"}
          </h1>
          <h4 className="text-sm font-semibold text-opacity-70">
            {existingRole
              ? "You can update the details of the selected role."
              : "You can create a customized user role here."}
          </h4>
        </div>

        <Input
          type="text"
          placeholder="Role Name"
          value={Role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mt-4"
        />

        <div className="mt-8 space-y-8">
          {loading ? (
            <p>Loading permissions...</p>
          ) : (
            Object.keys(permissions).map((group) => (
              <div key={group} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">{group}</h3>
                  <Switch
                    checked={isGroupSelected(group)}
                    onCheckedChange={() => handleGroupToggle(group)}
                  />
                </div>
                {permissions[group].map((perm) => (
                  <div key={perm.id} className="flex items-center mt-3">
                    <Switch
                      checked={selectedPermissions.includes(perm.name)}
                      onCheckedChange={() => handlePermissionToggle(perm.name)}
                    />
                    <Label className="ml-2">{perm.name}</Label>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        <Button
          variant="outline"
          disabled={!Role}
          onClick={handleRoleSubmit}
          className="mt-12"
        >
          {existingRole ? "Update Role" : "Create Role"}
        </Button>
      </SheetContent>
    </Sheet>
  );
}
