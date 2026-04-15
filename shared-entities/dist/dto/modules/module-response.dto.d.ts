export declare class ModuleDto {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    created_by: string | null;
    updated_by: string | null;
    created_at: Date;
    updated_at: Date;
}
export declare class ModuleResponseDto {
    statusCode: number;
    status: boolean;
    message: string;
    heading: string;
    data: ModuleDto;
}
export declare class ModulesListResponseDto {
    statusCode: number;
    status: boolean;
    message: string;
    heading: string;
    data: {
        modules: ModuleDto[];
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
