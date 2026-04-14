import { Controller, Get, Post, Put, Delete, Body, Param, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SystemUserService } from './system-user.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { DeleteModuleDto } from './dto/delete-module.dto';
import { PaginationDto } from './dto/pagination.dto';

@ApiTags('modules')
@ApiBearerAuth()
@Controller('modules')
export class ModulesController {
  constructor(private readonly systemUserService: SystemUserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create new module' })
  @ApiBody({ type: CreateModuleDto })
  async create(@Body() createModuleDto: CreateModuleDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.createModule(createModuleDto, token);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update module' })
  @ApiBody({ type: UpdateModuleDto })
  async update(@Body() updateModuleDto: UpdateModuleDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.updateModule(updateModuleDto, token);
  }

  @Get('getById/:id')
  @ApiOperation({ summary: 'Get module by ID' })
  @ApiParam({ name: 'id', description: 'Module ID', type: 'string' })
  async getById(@Param('id') id: string, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.getModuleById(id, token);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all modules with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  async getAll(@Query() paginationDto: PaginationDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.getAllModules(paginationDto, token);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete module' })
  @ApiBody({ type: DeleteModuleDto })
  async delete(@Body() deleteModuleDto: DeleteModuleDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.deleteModule(deleteModuleDto, token);
  }
}
