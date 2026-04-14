import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, tenantId?: string): Promise<any>;
    refreshToken(refreshDto: RefreshDto, tenantId?: string): Promise<any>;
    logout(req: any): Promise<any>;
}
