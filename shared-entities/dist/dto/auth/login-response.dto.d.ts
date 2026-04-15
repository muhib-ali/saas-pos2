import { ModuleWithPermissionsDto } from "./modules-permissions.dto";
export declare class UserDto {
    id: string;
    name: string;
    email: string;
    role: {
        id: string;
        title: string;
    };
}
export declare class LoginDataDto {
    user: UserDto;
    token: string;
    refresh_token: string;
    expires_at: string;
    modulesWithPermisssions: ModuleWithPermissionsDto[];
}
export declare class LoginResponseDto {
    statusCode: number;
    status: boolean;
    message: string;
    heading: string;
    data: LoginDataDto;
}
