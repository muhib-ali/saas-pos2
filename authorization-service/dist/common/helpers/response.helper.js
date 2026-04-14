"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
class ResponseHelper {
    static success(data, message = "Operation successful", heading = "Success", statusCode = 200) {
        return {
            statusCode,
            status: true,
            message,
            heading,
            data,
        };
    }
    static error(message = "Operation failed", heading = "Error", data = null) {
        return {
            statusCode: 400,
            status: false,
            message,
            heading,
            data,
        };
    }
    static errorWithStatus(statusCode, message = "Operation failed", heading = "Error", data = null) {
        return {
            statusCode,
            status: false,
            message,
            heading,
            data,
        };
    }
    static paginated(items, page, limit, total, dataKey, message = "Data retrieved successfully", heading = "Success") {
        const totalPages = Math.ceil(total / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;
        const nextPage = hasNext ? page + 1 : null;
        const prevPage = hasPrev ? page - 1 : null;
        const paginatedData = {
            [dataKey]: items,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext,
                hasPrev,
                nextPage,
                prevPage,
            },
        };
        return {
            statusCode: 200,
            status: true,
            message,
            heading,
            data: paginatedData,
        };
    }
}
exports.ResponseHelper = ResponseHelper;
//# sourceMappingURL=response.helper.js.map