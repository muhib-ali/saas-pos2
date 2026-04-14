import { Controller, Get, Post, Put, Delete, Body, Param, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SystemUserService } from './system-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { PaginationDto } from './dto/pagination.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly systemUserService: SystemUserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.createUser(createUserDto, token);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({ type: UpdateUserDto })
  async update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.updateUser(updateUserDto, token);
  }

  @Get('getById/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  async getById(@Param('id') id: string, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.getUserById(id, token);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  async getAll(@Query() paginationDto: PaginationDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.getAllUsers(paginationDto, token);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete user' })
  @ApiBody({ type: DeleteUserDto })
  async delete(@Body() deleteUserDto: DeleteUserDto, @Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.systemUserService.deleteUser(deleteUserDto, token);
  }
}
