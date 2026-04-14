import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
export declare class AuthService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    private readonly authServiceUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    login(loginDto: LoginDto, tenantId?: string): Promise<any>;
    refreshToken(refreshDto: RefreshDto, tenantId?: string): Promise<any>;
    logout(token: string, tenantId?: string): Promise<any>;
}
