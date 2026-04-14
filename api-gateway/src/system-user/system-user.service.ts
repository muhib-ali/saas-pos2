import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class SystemUserService {
  private readonly logger = new Logger(SystemUserService.name);
  private readonly systemUserServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.systemUserServiceUrl = this.configService.get<string>('SYSTEM_USER_SERVICE_URL');
  }

  private getHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  // Users
  async createUser(createUserDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.systemUserServiceUrl}/users/create`, createUserDto, {
          headers: this.getHeaders(token),
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Create user failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async updateUser(updateUserDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.put(`${this.systemUserServiceUrl}/users/update`, updateUserDto, {
          headers: this.getHeaders(token),
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Update user failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async getUserById(id: string, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.systemUserServiceUrl}/users/getById/${id}`, {
          headers: this.getHeaders(token),
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Get user by ID failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async getAllUsers(paginationDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.systemUserServiceUrl}/users/getAll`, {
          headers: this.getHeaders(token),
          params: paginationDto,
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Get all users failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async deleteUser(deleteUserDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.systemUserServiceUrl}/users/delete`, {
          headers: this.getHeaders(token),
          data: deleteUserDto,
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Delete user failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  // Roles
  async createRole(createRoleDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.systemUserServiceUrl}/roles/create`, createRoleDto, {
          headers: this.getHeaders(token),
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Create role failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async updateRole(updateRoleDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.put(`${this.systemUserServiceUrl}/roles/update`, updateRoleDto, {
          headers: this.getHeaders(token),
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Update role failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async getRoleById(id: string, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.systemUserServiceUrl}/roles/getById/${id}`, {
          headers: this.getHeaders(token),
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Get role by ID failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async getAllRoles(paginationDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.systemUserServiceUrl}/roles/getAll`, {
          headers: this.getHeaders(token),
          params: paginationDto,
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Get all roles failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async deleteRole(deleteRoleDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.systemUserServiceUrl}/roles/delete`, {
          headers: this.getHeaders(token),
          data: deleteRoleDto,
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Delete role failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async getAllPermissionsByRoleId(roleId: string, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.systemUserServiceUrl}/roles/getAllPermissionsByRoleId/${roleId}`, {
          headers: this.getHeaders(token),
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Get all permissions by role ID failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async updatePermissionsAccessByRoleId(updateDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.put(`${this.systemUserServiceUrl}/roles/updatePermissionsAccessByRoleId`, updateDto, {
          headers: this.getHeaders(token),
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Update permissions access by role ID failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  // Modules
  async createModule(createModuleDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.systemUserServiceUrl}/modules/create`, createModuleDto, {
          headers: this.getHeaders(token),
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Create module failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async updateModule(updateModuleDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.put(`${this.systemUserServiceUrl}/modules/update`, updateModuleDto, {
          headers: this.getHeaders(token),
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Update module failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async getModuleById(id: string, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.systemUserServiceUrl}/modules/getById/${id}`, {
          headers: this.getHeaders(token),
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Get module by ID failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async getAllModules(paginationDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.systemUserServiceUrl}/modules/getAll`, {
          headers: this.getHeaders(token),
          params: paginationDto,
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Get all modules failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async deleteModule(deleteModuleDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.systemUserServiceUrl}/modules/delete`, {
          headers: this.getHeaders(token),
          data: deleteModuleDto,
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Delete module failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  // Permissions
  async createPermission(createPermissionDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.systemUserServiceUrl}/permissions/create`, createPermissionDto, {
          headers: this.getHeaders(token),
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Create permission failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async updatePermission(updatePermissionDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.put(`${this.systemUserServiceUrl}/permissions/update`, updatePermissionDto, {
          headers: this.getHeaders(token),
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Update permission failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async getPermissionById(id: string, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.systemUserServiceUrl}/permissions/getById/${id}`, {
          headers: this.getHeaders(token),
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Get permission by ID failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async getAllPermissions(paginationDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.systemUserServiceUrl}/permissions/getAll`, {
          headers: this.getHeaders(token),
          params: paginationDto,
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Get all permissions failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async deletePermission(deletePermissionDto: any, token?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.systemUserServiceUrl}/permissions/delete`, {
          headers: this.getHeaders(token),
          data: deletePermissionDto,
          timeout: 30000,
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Delete permission failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }
}
