import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { RouteConfig } from './interfaces/route-config.interface';
export declare class ProxyService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    private readonly services;
    private readonly routes;
    private readonly defaultTimeout;
    constructor(httpService: HttpService, configService: ConfigService);
    private loadRoutes;
    getRouteConfig(method: string, path: string): RouteConfig;
    proxyRequest(routeConfig: RouteConfig, request: Request, response: Response, tenantId?: string, userId?: string): Promise<any>;
    private replacePathParams;
    private shouldForwardHeader;
    getAllRoutes(): RouteConfig[];
}
