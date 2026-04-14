export declare class PermissionUpdateDto {
    id: string;
    permissionSlug: string;
    isAllowed: boolean;
}
export declare class ModulePermissionsDto {
    moduleSlug: string;
    permissions: PermissionUpdateDto[];
}
export declare class UpdateRolePermissionsDto {
    roleId: string;
    modulesWithPermissions: ModulePermissionsDto[];
}
export declare class RolePermissionsResponseDto {
    modulesWithPermissions: ModulePermissionsDto[];
}
