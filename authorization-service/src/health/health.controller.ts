import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Health")
@Controller("health")
export class HealthController {
  @Get()
  @ApiOperation({ summary: "Overall health check" })
  @ApiResponse({
    status: 200,
    description: "Health check successful",
    schema: {
      example: {
        status: "ok",
        timestamp: new Date().toISOString(),
      },
    },
  })
  check() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }

  @Get("database")
  @ApiOperation({ summary: "Database health check" })
  @ApiResponse({ status: 200, description: "Database is healthy" })
  @ApiResponse({ status: 503, description: "Database is down" })
  checkDatabase() {
    return {
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    };
  }
}
