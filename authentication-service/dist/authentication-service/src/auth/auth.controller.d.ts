import { AuthService } from "./auth.service";
import { LoginDto } from "../../../api-gateway/src/auth/dto/login.dto";
import { RefreshDto } from "../../../api-gateway/src/auth/dto/refresh.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, tenantId?: string): Promise<import("../common/interfaces/api-response.interface").ApiResponse<any>>;
    refresh(refreshDto: RefreshDto): Promise<import("../common/interfaces/api-response.interface").ApiResponse<any>>;
    logout(req: any): Promise<import("../common/interfaces/api-response.interface").ApiResponse<null>>;
}
