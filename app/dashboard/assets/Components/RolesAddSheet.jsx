import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";

export function RolesAddSheet({onUpdate}) {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState({});
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [Role, setRole] = useState("");
  const isEditing = false;

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
            withXSRFToken: true,
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          const groupedPermissions = res.data.data.reduce((acc, permission) => {
            const groupName = permission.group_name;
            if (!acc[groupName]) {
              acc[groupName] = [];
            }
            acc[groupName].push(permission);
            return acc;
          }, {});

          setPermissions(groupedPermissions);
        }
      } catch (error) {
        console.error("Failed to fetch permissions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  // Handle toggle for individual permission
  const handlePermissionToggle = (groupName, permId) => {
    setSelectedPermissions((prev) => {
      const newSelected = { ...prev };
      if (!newSelected[groupName]) {
        newSelected[groupName] = [];
      }

      if (newSelected[groupName].includes(permId)) {
        newSelected[groupName] = newSelected[groupName].filter(
          (id) => id !== permId
        );
      } else {
        newSelected[groupName].push(permId);
      }
      return newSelected;
    });
  };

  console.log(selectedPermissions);

  // Handle toggle for select all in a group
  const handleSelectAllToggle = (groupName, isSelected) => {
    setSelectedPermissions((prev) => {
      const newSelected = { ...prev };
      if (isSelected) {
        newSelected[groupName] = permissions[groupName].map((perm) => perm.id);
      } else {
        delete newSelected[groupName];
      }
      return newSelected;
    });
  };

  const HandleRoleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/roles${
        isEditing ? `/${existingRole.id}` : ""
      }`;
      const method = isEditing ? "put" : "post";
      const res = await axios({
        method,
        url,
        data: {
          name: Role,
          permissions: selectedPermissions,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.status === 200 || res.status === 201) {
        toast(
          `${
            isEditing
              ? "Role Updated Successfully"
              : "Role Created Successfully"
          }`,
          { duration: 1600, position: "top-right" }
        );
        setLoading(false);

        onUpdate(res.data.data);
        setRole("");
        setSelectedPermissions([]);
        // setAddress("");
        // setPhoneNumber("");
        // setEmail("");

        // setOpenModal(false);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = err.response.data.errors;

        // Loop through each field in the error object
        Object.keys(errorMessages).forEach((field) => {
          const fieldErrors = errorMessages[field];

          // Show a toast for each error message related to the field
          fieldErrors.forEach((errorMessage) => {
            toast.error(`${field}: ${errorMessage}`, {
              duration: 4000, // Duration for each toast
              position: "top-right", // Position of the toast
            });
          });
        });
      } else {
        // setError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.", {
          duration: 4000,
          position: "top-right",
        });
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const HandleRoleCreateDisable = () => {
    return Role === "";
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Create Role</Button>
      </SheetTrigger>
      <SheetContent className="w-full   md:min-w-[85vw]">
        <div className="flex flex-col mb-6">
          <h1 className="text-xl font-bold">Create Roles</h1>
          <h4 className="text-sm font-semibold text-opacity-70">
            You Can Create Customized User Roles Here
          </h4>
        </div>

        <div className="mt-8 flex gap-2">
          <Input
            type="text"
            placeholder="Role Name"
            value={Role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="mt-8 space-y-6">
          {loading ? (
            <p>Loading permissions...</p>
          ) : Object.keys(permissions).length ? (
            Object.entries(permissions).map(([groupName, permissionList]) => {
              // Determine if all permissions are selected
              const allSelected = permissionList.every((perm) =>
                selectedPermissions[groupName]?.includes(perm.id)
              );

              return (
                <div key={groupName} className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-400">
                    {groupName}
                  </h3>

                  <div className="mt-4 flex items-center justify-between space-x-4">
                    {/* Select All Switch */}

                    {/* Individual Permission Switches */}
                    <div className="flex gap-4 ml-6">
                      {permissionList.map((perm) => (
                        <div key={perm.id} className="flex items-center">
                          <Switch
                          className="dark:bg-pink-600"
                            id={`perm-${perm.id}`}
                            checked={selectedPermissions[groupName]?.includes(
                              perm.id
                            )}
                            onCheckedChange={() =>
                              handlePermissionToggle(groupName, perm.id)
                            }
                          />
                          <Label htmlFor={`perm-${perm.id}`} className="ml-2 font-normal">
                            {perm.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center ms-auto">
                      <Switch
                        id={`select-all-${groupName}`}
                        checked={allSelected}
                        onCheckedChange={(checked) =>
                          handleSelectAllToggle(groupName, checked)
                        }
                      />
                      <Label
                        htmlFor={`select-all-${groupName}`}
                        className="ml-2"
                      >
                        Select All
                      </Label>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No permissions found.</p>
          )}
        </div>

        <Button variant="outline" disabled={HandleRoleCreateDisable} onClick={HandleRoleSubmit} className="mt-12">
          Create Role
        </Button>
      </SheetContent>
    </Sheet>
  );
}
