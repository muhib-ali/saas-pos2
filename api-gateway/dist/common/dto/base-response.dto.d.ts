export declare class BaseResponseDto<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: any[];
}
export declare class PaginationResponseDto<T> {
    success: boolean;
    message: string;
    data: T[];
    total: number;
    page: number;
    limit: number;
}
