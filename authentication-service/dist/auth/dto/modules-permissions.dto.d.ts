export declare class PermissionDetailDto {
    permission_name: string;
    is_Show_in_menu: boolean;
    permission_slug: string;
    route: string;
    is_allowed: boolean;
}
export declare class ModuleWithPermissionsDto {
    module_name: string;
    module_slug: string;
    permissions: PermissionDetailDto[];
}
