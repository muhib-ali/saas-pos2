export declare class RoleDto {
    id: string;
    title: string;
    slug: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
export declare class RoleResponseDto {
    statusCode: number;
    status: boolean;
    message: string;
    heading: string;
    data: RoleDto;
}
export declare class RolesListDataDto {
    roles: RoleDto[];
    pagination: any;
}
export declare class RolesListResponseDto {
    statusCode: number;
    status: boolean;
    message: string;
    heading: string;
    data: RolesListDataDto;
}
