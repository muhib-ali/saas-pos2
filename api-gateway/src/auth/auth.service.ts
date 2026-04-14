import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly authServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.authServiceUrl = this.configService.get<string>('services.authentication');
  }

  async login(loginDto: LoginDto, tenantId?: string) {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (tenantId) {
        headers['x-tenant-id'] = tenantId;
      }

      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/auth/login`, loginDto, {
          headers,
          timeout: 30000,
        }),
      );

      this.logger.log(`User logged in successfully: ${loginDto.email}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Login failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async refreshToken(refreshDto: RefreshDto, tenantId?: string) {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (tenantId) {
        headers['x-tenant-id'] = tenantId;
      }

      const response = await firstValueFrom(
        this.httpService.post(
          `${this.authServiceUrl}/auth/refresh`,
          refreshDto,
          { headers, timeout: 30000 },
        ),
      );

      this.logger.log('Token refreshed successfully');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Token refresh failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }

  async logout(token: string, tenantId?: string) {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      if (tenantId) {
        headers['x-tenant-id'] = tenantId;
      }

      const response = await firstValueFrom(
        this.httpService.post(
          `${this.authServiceUrl}/auth/logout`,
          {},
          { headers, timeout: 30000 },
        ),
      );

      this.logger.log('User logged out successfully');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Logout failed: ${error.message}`);
        throw error.response?.data || error;
      }
      throw error;
    }
  }
}
