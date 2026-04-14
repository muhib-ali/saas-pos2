import { IsUUID, IsString, IsBoolean, IsArray, IsNotEmpty } from "class-validator";

export class PermissionUpdateDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  permissionSlug: string;

  @IsBoolean()
  isAllowed: boolean;
}

export class ModulePermissionsDto {
  @IsString()
  @IsNotEmpty()
  moduleSlug: string;

  @IsArray()
  @IsNotEmpty()
  permissions: PermissionUpdateDto[];
}

export class UpdateRolePermissionsDto {
  @IsUUID()
  roleId: string;

  @IsArray()
  @IsNotEmpty()
  modulesWithPermissions: ModulePermissionsDto[];
}

export class RolePermissionsResponseDto {
  modulesWithPermissions: ModulePermissionsDto[];
}
