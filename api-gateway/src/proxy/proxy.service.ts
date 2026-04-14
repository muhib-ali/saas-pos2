import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { RouteConfig } from './interfaces/route-config.interface';
import { userRoutes } from './routes/users.routes';
import { tenantRoutes } from './routes/tenants.routes';
import { roleRoutes } from './routes/roles.routes';
import { permissionRoutes } from './routes/permissions.routes';
import { moduleRoutes } from './routes/modules.routes';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  private readonly services: Record<string, string>;
  private readonly routes: Map<string, RouteConfig>;
  private readonly defaultTimeout = 30000;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.services = {
      'authentication-service': this.configService.get<string>('services.authentication'),
      'system-user-service': this.configService.get<string>('services.systemUser'),
      'authorization-service': this.configService.get<string>('services.authorization'),
    };
    this.routes = new Map();
    this.loadRoutes();
  }

  private loadRoutes() {
    [...userRoutes, ...tenantRoutes, ...roleRoutes, ...permissionRoutes, ...moduleRoutes]
      .forEach(route => {
        const key = `${route.method}:${route.path}`;
        this.routes.set(key, route);
      });

    this.logger.log(`Loaded ${this.routes.size} proxy routes`);
  }

  getRouteConfig(method: string, path: string): RouteConfig {
    const key = `${method}:${path}`;
    const route = this.routes.get(key);
    
    if (!route) {
      throw new NotFoundException(`Route not found: ${method} ${path}`);
    }
    
    return route;
  }

  async proxyRequest(
    routeConfig: RouteConfig,
    request: Request,
    response: Response,
    tenantId?: string,
    userId?: string,
  ) {
    const serviceUrl = this.services[routeConfig.targetService];
    
    if (!serviceUrl) {
      throw new BadRequestException(`Service not found: ${routeConfig.targetService}`);
    }

    const targetPath = this.replacePathParams(routeConfig.targetPath, request.params);
    const targetUrl = `${serviceUrl}${targetPath}`;

    const headers: Record<string, string> = {
      'Content-Type': request.headers['content-type'] || 'application/json',
      'User-Agent': request.headers['user-agent'] || 'API-Gateway',
      'X-Forwarded-For': request.ip,
    };

    if (request.headers.authorization) {
      headers['Authorization'] = request.headers.authorization as string;
    }

    if (tenantId) {
      headers['x-tenant-id'] = tenantId;
    }

    if (userId) {
      headers['x-user-id'] = userId;
    }

    const axiosConfig: AxiosRequestConfig = {
      method: routeConfig.method,
      url: targetUrl,
      headers,
      timeout: routeConfig.timeout || this.defaultTimeout,
      params: request.query,
      data: request.body,
      validateStatus: () => true,
    };

    try {
      const axiosResponse = await firstValueFrom(
        this.httpService.request(axiosConfig),
      );

      response.status(axiosResponse.status);
      
      Object.entries(axiosResponse.headers).forEach(([key, value]) => {
        if (this.shouldForwardHeader(key)) {
          response.setHeader(key, value as string);
        }
      });

      this.logger.log(`Proxied ${routeConfig.method} ${routeConfig.path} to ${targetUrl}`);

      return axiosResponse.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { message: 'Internal server error' };
        response.status(status);
        this.logger.error(`Proxy error: ${error.message}`);
        return data;
      }
      throw error;
    }
  }

  private replacePathParams(path: string, params: Record<string, string>): string {
    return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => params[key] || `:${key}`);
  }

  private shouldForwardHeader(header: string): boolean {
    const excludedHeaders = ['host', 'connection', 'transfer-encoding'];
    return !excludedHeaders.includes(header.toLowerCase());
  }

  getAllRoutes(): RouteConfig[] {
    return Array.from(this.routes.values());
  }
}
