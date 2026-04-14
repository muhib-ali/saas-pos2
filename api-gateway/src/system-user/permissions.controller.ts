import { Controller, Get, Post, Put, Delete, Body, Param, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SystemUserService } from './system-user.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { DeletePermissionDto } from './dto/delete-permission.dto';
import { PaginationDto } from './dto/pagination.dto';

@ApiTags('permissions')
@ApiBearerAuth()
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly systemUserService: SystemUserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create new permission' })
  @ApiBody({ type: CreatePermissionDto })
  async create(@Body() createPermissionDto: CreatePermissionDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.createPermission(createPermissionDto, token);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update permission' })
  @ApiBody({ type: UpdatePermissionDto })
  async update(@Body() updatePermissionDto: UpdatePermissionDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.updatePermission(updatePermissionDto, token);
  }

  @Get('getById/:id')
  @ApiOperation({ summary: 'Get permission by ID' })
  @ApiParam({ name: 'id', description: 'Permission ID', type: 'string' })
  async getById(@Param('id') id: string, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.getPermissionById(id, token);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all permissions with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  async getAll(@Query() paginationDto: PaginationDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.getAllPermissions(paginationDto, token);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete permission' })
  @ApiBody({ type: DeletePermissionDto })
  async delete(@Body() deletePermissionDto: DeletePermissionDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.deletePermission(deletePermissionDto, token);
  }
}
