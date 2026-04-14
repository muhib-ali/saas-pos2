export declare class ModuleDto {
    id: string;
    title: string;
    slug: string;
    description: string | null;
}
export declare class PermissionDto {
    id: string;
    module_id: string;
    title: string;
    slug: string;
    description: string | null;
    module: ModuleDto;
    is_active: boolean;
    created_by: string | null;
    updated_by: string | null;
    created_at: Date;
    updated_at: Date;
}
export declare class PermissionResponseDto {
    statusCode: number;
    status: boolean;
    message: string;
    heading: string;
    data: PermissionDto;
}
export declare class PermissionsListResponseDto {
    statusCode: number;
    status: boolean;
    message: string;
    heading: string;
    data: {
        permissions: PermissionDto[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
            nextPage: number | null;
            prevPage: number | null;
        };
    };
}
