import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {
  @ApiProperty({
    description: "Role UUID",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  id: string;

  @ApiProperty({
    description: "Role title",
    example: "Platform Admin",
  })
  title: string;

  @ApiProperty({
    description: "Role slug (auto-generated)",
    example: "platformAdmin",
  })
  slug: string;

  @ApiProperty({
    description: "Role active status",
    example: true,
  })
  is_active: boolean;

  @ApiProperty({
    description: "Creation timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  created_at: string;

  @ApiProperty({
    description: "Last update timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  updated_at: string;
}

export class RoleResponseDto {
  @ApiProperty({
    description: "HTTP status code",
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: "Success status",
    example: true,
  })
  status: boolean;

  @ApiProperty({
    description: "Response message",
    example: "Role created successfully",
  })
  message: string;

  @ApiProperty({
    description: "Module heading",
    example: "Role",
  })
  heading: string;

  @ApiProperty({ type: RoleDto })
  data: RoleDto;
}

export class RolesListDataDto {
  @ApiProperty({
    type: [RoleDto],
    description: "Array of roles",
  })
  roles: RoleDto[];

  @ApiProperty({
    description: "Pagination data",
    type: "object",
  })
  pagination: any;
}

export class RolesListResponseDto {
  @ApiProperty({
    description: "HTTP status code",
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: "Success status",
    example: true,
  })
  status: boolean;

  @ApiProperty({
    description: "Response message",
    example: "Roles retrieved successfully",
  })
  message: string;

  @ApiProperty({
    description: "Module heading",
    example: "Role",
  })
  heading: string;

  @ApiProperty({ type: RolesListDataDto })
  data: RolesListDataDto;
}
