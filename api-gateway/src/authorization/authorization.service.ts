import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CheckPermissionDto } from './dto/check-permission.dto';
import { CheckRoleDto, CheckRolesDto } from './dto/check-role.dto';
import { CheckAccessDto } from './dto/check-access.dto';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AuthorizationService {
  private readonly logger = new Logger(AuthorizationService.name);
  private readonly authorizationServiceUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.authorizationServiceUrl = process.env.AUTHORIZATION_SERVICE_URL || 'http://localhost:3003';
  }

  async checkPermission(checkPermissionDto: CheckPermissionDto, tenantId?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.authorizationServiceUrl}/authorization/check-permission`,
          checkPermissionDto,
          {
            headers: tenantId ? { 'x-tenant-id': tenantId } : {},
          },
        ),
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Permission check failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async checkRole(checkRoleDto: CheckRoleDto, tenantId?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.authorizationServiceUrl}/authorization/check-role`,
          checkRoleDto,
          {
            headers: tenantId ? { 'x-tenant-id': tenantId } : {},
          },
        ),
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Role check failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async checkRoles(checkRolesDto: CheckRolesDto, tenantId?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.authorizationServiceUrl}/authorization/check-roles`,
          checkRolesDto,
          {
            headers: tenantId ? { 'x-tenant-id': tenantId } : {},
          },
        ),
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Roles check failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async checkAccess(checkAccessDto: CheckAccessDto, tenantId?: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.authorizationServiceUrl}/authorization/check-access`,
          checkAccessDto,
          {
            headers: tenantId ? { 'x-tenant-id': tenantId } : {},
          },
        ),
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Access check failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }
}
