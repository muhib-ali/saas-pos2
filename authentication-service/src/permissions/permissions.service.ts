import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permission, Module } from 'shared-entities';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  DeletePermissionDto,
  PermissionFilterDto
} from 'shared-entities';
import { ResponseHelper } from "shared-entities";
import {
  ApiResponse,
  PaginatedApiResponse,
} from "shared-entities";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Module)
    private moduleRepository: Repository<Module>
  ) {}

  async create(
    createPermissionDto: CreatePermissionDto,
    loggedInUserId: string
  ): Promise<ApiResponse<Permission>> {
    const { module_id, title, slug, description } = createPermissionDto;

    // Check if module exists
    const module = await this.moduleRepository.findOne({
      where: { id: module_id },
    });

    if (!module) {
      throw new BadRequestException("Module not found");
    }

    // Check if permission with same slug already exists in this module
    const existingPermission = await this.permissionRepository.findOne({
      where: { slug, module_id: module_id },
    });

    if (existingPermission) {
      throw new BadRequestException(
        "Permission with this slug already exists in this module"
      );
    }

    const permission = this.permissionRepository.create({
      module_id: module_id,
      title,
      slug,
      description,
      created_by: loggedInUserId,
      updated_by: loggedInUserId,
    });

    const savedPermission = await this.permissionRepository.save(permission);

    // Get permission with module for response
    const permissionWithModule = await this.permissionRepository.findOne({
      where: { id: savedPermission.id },
      relations: ["module"],
    });

    return ResponseHelper.success(
      permissionWithModule!,
      "Permission created successfully",
      "Permission",
      201
    );
  }

  async update(
    updatePermissionDto: UpdatePermissionDto,
    loggedInUserId: string
  ): Promise<ApiResponse<Permission>> {
    const { id, module_id, title, slug, description } = updatePermissionDto;

    const permission = await this.permissionRepository.findOne({
      where: { id },
      relations: ["module"],
    });

    if (!permission) {
      throw new NotFoundException("Permission not found");
    }

    // Check if module exists
    const module = await this.moduleRepository.findOne({
      where: { id: module_id },
    });

    if (!module) {
      throw new BadRequestException("Module not found");
    }

    // Check if another permission with same slug exists in this module (excluding current permission)
    const existingPermission = await this.permissionRepository.findOne({
      where: { slug, module_id: module_id },
    });

    if (existingPermission && existingPermission.id !== id) {
      throw new BadRequestException(
        "Permission with this slug already exists in this module"
      );
    }

    // Prepare update data
    const updateData = {
      module_id,
      title,
      slug,
      description,
      updated_by: loggedInUserId,
    };

    await this.permissionRepository.update(id, updateData);

    const updatedPermission = await this.permissionRepository.findOne({
      where: { id },
      relations: ["module"],
    });

    return ResponseHelper.success(
      updatedPermission!,
      "Permission updated successfully",
      "Permission",
      200
    );
  }

  async getById(id: string): Promise<ApiResponse<Permission>> {
    const permission = await this.permissionRepository.findOne({
      where: { id },
      relations: ["module"],
    });

    if (!permission) {
      throw new NotFoundException("Permission not found");
    }

    return ResponseHelper.success(
      permission,
      "Permission retrieved successfully",
      "Permission",
      200
    );
  }

  async getAll(
    filterDto: PermissionFilterDto
  ): Promise<PaginatedApiResponse<Permission>> {
    const { page = 1, limit = 10, module_id } = filterDto;
    const skip = (page - 1) * limit;

    // Build query conditions
    const whereConditions: any = {};

    // Add module filter if provided
    if (module_id) {
      whereConditions.module_id = module_id;
    }

    const [permissions, total] = await this.permissionRepository.findAndCount({
      where: whereConditions,
      skip,
      take: limit,
      relations: ["module"],
      order: { created_at: "DESC" },
    });

    const message = module_id
      ? "Permissions filtered by module retrieved successfully"
      : "Permissions retrieved successfully";

    return ResponseHelper.paginated(
      permissions,
      page,
      limit,
      total,
      "permissions",
      message,
      "Permission"
    );
  }

  async delete(
    deletePermissionDto: DeletePermissionDto
  ): Promise<ApiResponse<null>> {
    const { id } = deletePermissionDto;

    const permission = await this.permissionRepository.findOne({
      where: { id },
    });

    if (!permission) {
      throw new NotFoundException("Permission not found");
    }

    await this.permissionRepository.remove(permission);

    return ResponseHelper.success(
      null,
      "Permission deleted successfully",
      "Permission",
      200
    );
  }
}
