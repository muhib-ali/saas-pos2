import { Controller, Get, Post, Put, Delete, Body, Param, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SystemUserService } from './system-user.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { UpdateRolePermissionsDto } from './dto/role-permissions.dto';
import { PaginationDto } from './dto/pagination.dto';

@ApiTags('roles')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly systemUserService: SystemUserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create new role' })
  @ApiBody({ type: CreateRoleDto })
  async create(@Body() createRoleDto: CreateRoleDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.createRole(createRoleDto, token);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update existing role' })
  @ApiBody({ type: UpdateRoleDto })
  async update(@Body() updateRoleDto: UpdateRoleDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.updateRole(updateRoleDto, token);
  }

  @Get('getById/:id')
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiParam({ name: 'id', description: 'Role UUID', type: 'string' })
  async getById(@Param('id') id: string, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.getRoleById(id, token);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all roles with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10, max: 100)', example: 10 })
  async getAll(@Query() paginationDto: PaginationDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.getAllRoles(paginationDto, token);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete role' })
  @ApiBody({ type: DeleteRoleDto })
  async delete(@Body() deleteRoleDto: DeleteRoleDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.deleteRole(deleteRoleDto, token);
  }

  @Get('getAllPermissionsByRoleId/:roleId')
  @ApiOperation({ summary: 'Get all permissions by role ID' })
  @ApiParam({ name: 'roleId', description: 'Role ID', type: 'string' })
  async getAllPermissionsByRoleId(@Param('roleId') roleId: string, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.getAllPermissionsByRoleId(roleId, token);
  }

  @Put('updatePermissionsAccessByRoleId')
  @ApiOperation({ summary: 'Update permissions access by role ID' })
  @ApiBody({ type: UpdateRolePermissionsDto })
  async updatePermissionsAccessByRoleId(@Body() updateDto: UpdateRolePermissionsDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.updatePermissionsAccessByRoleId(updateDto, token);
  }
}
