export declare class RolePermissionDto {
    id: string;
    permission_slug: string;
    is_allowed: boolean;
}
export declare class RoleModuleWithPermissionsDto {
    module_slug: string;
    permissions: RolePermissionDto[];
}
export declare class RolePermissionsResponseDto {
    statusCode: number;
    status: boolean;
    message: string;
    heading: string;
    data: {
        modulesWithPermisssions: RoleModuleWithPermissionsDto[];
    };
}
export declare class UpdateRolePermissionDto {
    id: string;
    permissionSlug: string;
    isAllowed: boolean;
}
export declare class UpdateModulePermissionsDto {
    moduleSlug: string;
    permissions: UpdateRolePermissionDto[];
}
export declare class UpdateRolePermissionsDto {
    roleId: string;
    modulesWithPermissions: UpdateModulePermissionsDto[];
}
