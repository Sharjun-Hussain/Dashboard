export const hasPermission = (userPermissions, section, action) => {
  const requiredPermission = permissions?.[section]?.[action];
  return userPermissions.includes(requiredPermission);
};
