import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';
export declare class ProxyController {
    private readonly proxyService;
    constructor(proxyService: ProxyService);
    proxy(request: Request, response: Response, headers: any, tenantId?: string): Promise<any>;
}
