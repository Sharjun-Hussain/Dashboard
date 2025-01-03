const { hasPermissions } = require("@/lib/PermissionChecker");

export const canViewOffices = hasPermissions(UserPermissions, "Office", [
  "Index",
]);
export const canManageAssets = hasPermissions(UserPermissions, "Product", [
  "Index",
]);
export const canViewWarehouses = hasPermissions(UserPermissions, "Warehouse", [
  "Index",
]);
export const canViewRoles = hasPermissions(UserPermissions, "Role", ["Index"]);
