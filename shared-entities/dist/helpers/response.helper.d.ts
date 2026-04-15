import { ApiResponse, PaginatedApiResponse } from "../interfaces/api-response.interface";
export declare class ResponseHelper {
    static success<T>(data: T, message?: string, heading?: string, statusCode?: number): ApiResponse<T>;
    static error(message?: string, heading?: string, data?: any): ApiResponse<any>;
    static errorWithStatus(statusCode: number, message?: string, heading?: string, data?: any): {
        statusCode: number;
        status: boolean;
        message: string;
        heading: string;
        data: any;
    };
    static paginated<T>(items: T[], page: number, limit: number, total: number, dataKey: string, message?: string, heading?: string): PaginatedApiResponse<T>;
}
