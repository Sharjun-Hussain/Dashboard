import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";

export function RolesAddSheet({ onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState({});
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [Role, setRole] = useState("");

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
        }
      } catch (error) {
        console.error("Failed to fetch permissions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

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
    console.log(selectedPermissions);

    permissions[group].every((perm) => selectedPermissions.includes(perm.name));
  };

  const HandleRoleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/roles`,
        {
          name: Role,
          permissions: selectedPermissions,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.status === 201) {
        toast("Role Created Successfully", {
          duration: 1600,
          position: "top-right",
        });
        onUpdate(res.data.data);
        setRole("");
        setSelectedPermissions([]);
      }
    } catch (err) {
      toast.error("Failed to create role.", {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Create Role</Button>
      </SheetTrigger>
      <SheetContent className="w-full md:min-w-[85vw] overflow-y-auto">
        <div className="flex flex-col mb-6">
          <h1 className="text-xl font-bold">Create Roles</h1>
          <h4 className="text-sm font-semibold text-opacity-70">
            You Can Create Customized User Roles Here
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
          onClick={HandleRoleSubmit}
          className="mt-12"
        >
          Create Role
        </Button>
      </SheetContent>
    </Sheet>
  );
}
