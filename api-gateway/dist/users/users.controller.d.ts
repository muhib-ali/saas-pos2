import { HttpService } from '@nestjs/axios';
export declare class UsersController {
    private readonly httpService;
    constructor(httpService: HttpService);
    createUser(createUserDto: any, tenantId?: string): Promise<any>;
    updateUser(updateUserDto: any, tenantId?: string): Promise<any>;
    getUserById(id: string, tenantId?: string): Promise<any>;
    getAllUsers(query: any, tenantId?: string): Promise<any>;
    deleteUser(deleteUserDto: any, tenantId?: string): Promise<any>;
}
