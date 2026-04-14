import { SystemUserService } from './system-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { PaginationDto } from './dto/pagination.dto';
export declare class UsersController {
    private readonly systemUserService;
    constructor(systemUserService: SystemUserService);
    create(createUserDto: CreateUserDto, req: any): Promise<any>;
    update(updateUserDto: UpdateUserDto, req: any): Promise<any>;
    getById(id: string, req: any): Promise<any>;
    getAll(paginationDto: PaginationDto, req: any): Promise<any>;
    delete(deleteUserDto: DeleteUserDto, req: any): Promise<any>;
}
