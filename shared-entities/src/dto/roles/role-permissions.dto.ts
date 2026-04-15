import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsBoolean,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

// DTO for single permission in the response
export class RolePermissionDto {
  @ApiProperty({
    description: "Permission ID",
    example: "9eca588e-e8f9-4346-abea-f57e84d85069",
  })
  id: string;

  @ApiProperty({
    description: "Permission slug",
    example: "create",
  })
  permission_slug: string;

  @ApiProperty({
    description: "Whether the permission is allowed for this role",
    example: true,
  })
  is_allowed: boolean;
}

// DTO for module with permissions in the response
export class RoleModuleWithPermissionsDto {
  @ApiProperty({
    description: "Module slug",
    example: "claimManagement",
  })
  module_slug: string;

  @ApiProperty({
    description: "List of permissions for this module",
    type: [RolePermissionDto],
  })
  permissions: RolePermissionDto[];
}

// DTO for the main response
export class RolePermissionsResponseDto {
  @ApiProperty({
    description: "Status code",
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: "Operation status",
    example: true,
  })
  status: boolean;

  @ApiProperty({
    description: "Response message",
    example: "Role permissions retrieved successfully",
  })
  message: string;

  @ApiProperty({
    description: "Response heading",
    example: "Role",
  })
  heading: string;

  @ApiProperty({
    description: "Modules with permissions data",
    type: "object",
    properties: {
      modulesWithPermisssions: {
        type: "array",
        items: { $ref: "#/components/schemas/RoleModuleWithPermissionsDto" },
      },
    },
  })
  data: {
    modulesWithPermisssions: RoleModuleWithPermissionsDto[];
  };
}

// DTOs for update endpoint
export class UpdateRolePermissionDto {
  @ApiProperty({
    description: "Permission ID",
    example: "9eca588e-e8f9-4346-abea-f57e84d85069",
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: "Permission slug",
    example: "create",
  })
  @IsString()
  @IsNotEmpty()
  permissionSlug: string;

  @ApiProperty({
    description: "Whether the permission is allowed for this role",
    example: true,
  })
  @IsBoolean()
  isAllowed: boolean;
}

export class UpdateModulePermissionsDto {
  @ApiProperty({
    description: "Module slug",
    example: "roles",
  })
  @IsString()
  @IsNotEmpty()
  moduleSlug: string;

  @ApiProperty({
    description: "List of permissions for this module",
    type: [UpdateRolePermissionDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRolePermissionDto)
  permissions: UpdateRolePermissionDto[];
}

export class UpdateRolePermissionsDto {
  @ApiProperty({
    description: "Role ID",
    example: "8af18c09-a3c0-4aeb-b730-6d489bfb26d0",
  })
  @IsUUID()
  @IsNotEmpty()
  roleId: string;

  @ApiProperty({
    description: "Modules with permissions to update",
    type: [UpdateModulePermissionsDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateModulePermissionsDto)
  modulesWithPermissions: UpdateModulePermissionsDto[];
}
