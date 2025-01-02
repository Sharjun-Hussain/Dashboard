import { Button } from "@/components/ui/button"; // Import Button component
import { Input } from "@/components/ui/input"; // Import Input component
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Import Sheet components for modal functionality
import { Switch } from "@/components/ui/switch"; // Import Switch component
import { Label } from "@/components/ui/label"; // Import Label component
import { useEffect, useState } from "react"; // Import hooks from React
import axios from "axios"; // Import axios for API requests

export function RolesAddSheet({ onUpdate }) {
  // State hooks to manage component state
  const [loading, setLoading] = useState(false); // Loading state during API calls
  const [permissions, setPermissions] = useState({}); // Permissions grouped by categories
  const [selectedPermissions, setSelectedPermissions] = useState({}); // Permissions selected by the user
  const [Role, setRole] = useState(""); // Role name input state
  const isEditing = false; // Flag to check if editing existing role

  // Additional state hooks to manage permission data in different formats
  const [permissionsByGroup, setPermissionsByGroup] = useState({}); // Permissions categorized by group
  const [permissionsById, setPermissionsById] = useState([]); // List of permission IDs
  const [permissionsByName, setPermissionsByName] = useState({}); // Permissions categorized by name
  const [selectedPermissionsByName, setSelectedPermissionsByName] = useState(
    []
  ); // Selected permission names

  // Fetch permissions when component mounts
  useEffect(() => {
    const fetchPermissions = async () => {
      setLoading(true); // Start loading
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/permission`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in headers
            },
            withXSRFToken: true, // Enable CSRF protection
            withCredentials: true, // Include credentials in request
          }
        );

        if (res.status === 200) {
          // Group permissions by their group_name
          const groupedPermissions = res.data.data.reduce((acc, permission) => {
            const groupName = permission.group_name;
            if (!acc[groupName]) {
              acc[groupName] = [];
            }
            acc[groupName].push(permission);
            return acc;
          }, {});

          setPermissions(groupedPermissions); // Store grouped permissions

          // Prepare additional permission states
          const permissionsByIdList = res.data.data.map((perm) => perm.id);
          const permissionsByNameGrouped = res.data.data.reduce(
            (acc, permission) => {
              const groupName = permission.group_name;
              if (!acc[groupName]) {
                acc[groupName] = [];
              }
              acc[groupName].push(permission.name);
              return acc;
            },
            {}
          );
          const permissionNames = res.data.data.map((perm) => perm.name);

          setPermissionsByGroup(groupedPermissions); // Store permissions by group
          setPermissionsById(permissionsByIdList); // Store permission IDs
          setPermissionsByName(permissionsByNameGrouped); // Store permissions by name
          setSelectedPermissionsByName(permissionNames); // Store selected permission names
        }
      } catch (error) {
        console.error("Failed to fetch permissions", error); // Log errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPermissions(); // Trigger fetch function
  }, []);

  // Toggle individual permission selections
  const handlePermissionToggle = (groupName, permId) => {
    setSelectedPermissions((prev) => {
      const newSelected = { ...prev };
      if (!newSelected[groupName]) {
        newSelected[groupName] = [];
      }

      // Add or remove permission based on its current selection state
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

  // Toggle entire group of permissions
  const handleSelectAllToggle = (groupName, isSelected) => {
    setSelectedPermissions((prev) => {
      const newSelected = { ...prev };
      if (isSelected) {
        // Select all permissions within the group
        newSelected[groupName] = permissions[groupName].map((perm) => perm.id);
        console.log(permissionsByGroup, permissionsById, permissionsByName);
      } else {
        // Deselect all permissions
        delete newSelected[groupName];
      }
      return newSelected;
    });
  };

  // Handle form submission to create or update a role
  const HandleRoleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Start loading
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/roles${
        isEditing ? `/${existingRole.id}` : ""
      }`;
      const method = isEditing ? "put" : "post"; // Choose method based on editing status
      const res = await axios({
        method,
        url,
        data: {
          name: Role, // Role name
          permissions: selectedPermissions, // Selected permissions
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.status === 200 || res.status === 201) {
        toast(
          `$${
            isEditing
              ? "Role Updated Successfully"
              : "Role Created Successfully"
          }`,
          { duration: 1600, position: "top-right" }
        );
        setLoading(false);
        onUpdate(res.data.data); // Trigger update callback
        setRole("");
        setSelectedPermissions([]); // Reset selections
      }
    } catch (err) {
      console.error("An error occurred.");
      setLoading(false);
    }
  };

  // Disable the Create button if Role input is empty
  const HandleRoleCreateDisable = () => {
    return Role === "";
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Create Role</Button>
      </SheetTrigger>
      <SheetContent className="w-full md:min-w-[85vw]">
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
                          <Label
                            htmlFor={`perm-${perm.id}`}
                            className="ml-2 font-normal"
                          >
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

        <Button
          variant="outline"
          disabled={HandleRoleCreateDisable()}
          onClick={HandleRoleSubmit}
          className="mt-12"
        >
          Create Role
        </Button>
      </SheetContent>
    </Sheet>
  );
}
