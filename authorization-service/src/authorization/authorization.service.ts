import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  Permission,
  Role,
  RolePermission,
  UserPermissions,
  AuthorizationResult,
} from './interfaces/permission.interface';

@Injectable()
export class AuthorizationService {
  private readonly logger = new Logger(AuthorizationService.name);
  private permissionCache = new Map<string, RolePermission[]>();
  private roleCache = new Map<string, Role[]>();

  constructor(private readonly httpService: HttpService) {}

  /**
   * Check if user has a specific permission
   */
  async hasPermission(userId: string, permission: string, tenantId?: string): Promise<boolean> {
    try {
      const permissions = await this.getUserPermissions(userId, tenantId);
      const hasPermission = permissions.some(p => 
        `${p.module_slug}.${p.permission_slug}` === permission
      );
      
      this.logger.log(`User ${userId} has permission ${permission}: ${hasPermission}`);
      return hasPermission;
    } catch (error) {
      this.logger.error(`Error checking permission ${permission} for user ${userId}:`, error);
      return false;
    }
  }

  /**
   * Check if user has any of the specified permissions
   */
  async hasAnyPermission(userId: string, permissions: string[], tenantId?: string): Promise<boolean> {
    try {
      const userPermissions = await this.getUserPermissions(userId, tenantId);
      const permissionSlugs = permissions.map(p => p.split('.').pop());
      
      const hasAny = userPermissions.some(p => 
        permissionSlugs.includes(p.permission_slug)
      );
      
      this.logger.log(`User ${userId} has any of permissions ${permissions}: ${hasAny}`);
      return hasAny;
    } catch (error) {
      this.logger.error(`Error checking permissions for user ${userId}:`, error);
      return false;
    }
  }

  /**
   * Check if user has all of the specified permissions
   */
  async hasAllPermissions(userId: string, permissions: string[], tenantId?: string): Promise<boolean> {
    try {
      const userPermissions = await this.getUserPermissions(userId, tenantId);
      const permissionSlugs = permissions.map(p => p.split('.').pop());
      
      const hasAll = permissionSlugs.every(slug =>
        userPermissions.some(p => p.permission_slug === slug)
      );
      
      this.logger.log(`User ${userId} has all permissions ${permissions}: ${hasAll}`);
      return hasAll;
    } catch (error) {
      this.logger.error(`Error checking permissions for user ${userId}:`, error);
      return false;
    }
  }

  /**
   * Get all permissions for a user
   */
  async getUserPermissions(userId: string, tenantId?: string): Promise<RolePermission[]> {
    try {
      // Check cache first
      const cacheKey = `${userId}_${tenantId || 'public'}`;
      if (this.permissionCache.has(cacheKey)) {
        return this.permissionCache.get(cacheKey);
      }

      // Fetch from system-user-service
      const response = await this.httpService
        .get(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/auth/user-permissions/${userId}`, {
          headers: tenantId ? { 'x-tenant-id': tenantId } : {},
        })
        .toPromise();

      const permissions = response.data.data || [];
      
      // Cache for 5 minutes
      this.permissionCache.set(cacheKey, permissions);
      setTimeout(() => this.permissionCache.delete(cacheKey), 5 * 60 * 1000);

      return permissions;
    } catch (error) {
      this.logger.error(`Error fetching permissions for user ${userId}:`, error);
      return [];
    }
  }

  /**
   * Check if user has a specific role
   */
  async hasRole(userId: string, role: string, tenantId?: string): Promise<boolean> {
    try {
      const roles = await this.getUserRoles(userId, tenantId);
      const hasRole = roles.some(r => r.slug === role);
      
      this.logger.log(`User ${userId} has role ${role}: ${hasRole}`);
      return hasRole;
    } catch (error) {
      this.logger.error(`Error checking role ${role} for user ${userId}:`, error);
      return false;
    }
  }

  /**
   * Check if user has any of the specified roles
   */
  async hasAnyRole(userId: string, roles: string[], tenantId?: string): Promise<boolean> {
    try {
      const userRoles = await this.getUserRoles(userId, tenantId);
      const roleSlugs = userRoles.map(r => r.slug);
      
      const hasAny = roles.some(role => roleSlugs.includes(role));
      
      this.logger.log(`User ${userId} has any of roles ${roles}: ${hasAny}`);
      return hasAny;
    } catch (error) {
      this.logger.error(`Error checking roles for user ${userId}:`, error);
      return false;
    }
  }

  /**
   * Check if user has all of the specified roles
   */
  async hasAllRoles(userId: string, roles: string[], tenantId?: string): Promise<boolean> {
    try {
      const userRoles = await this.getUserRoles(userId, tenantId);
      const roleSlugs = userRoles.map(r => r.slug);
      
      const hasAll = roles.every(role => roleSlugs.includes(role));
      
      this.logger.log(`User ${userId} has all roles ${roles}: ${hasAll}`);
      return hasAll;
    } catch (error) {
      this.logger.error(`Error checking roles for user ${userId}:`, error);
      return false;
    }
  }

  /**
   * Get all roles for a user
   */
  async getUserRoles(userId: string, tenantId?: string): Promise<Role[]> {
    try {
      // Check cache first
      const cacheKey = `${userId}_roles_${tenantId || 'public'}`;
      if (this.roleCache.has(cacheKey)) {
        return this.roleCache.get(cacheKey);
      }

      // Fetch from system-user-service
      const response = await this.httpService
        .get(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/auth/user-roles/${userId}`, {
          headers: tenantId ? { 'x-tenant-id': tenantId } : {},
        })
        .toPromise();

      const roles = response.data.data || [];
      
      // Cache for 5 minutes
      this.roleCache.set(cacheKey, roles);
      setTimeout(() => this.roleCache.delete(cacheKey), 5 * 60 * 1000);

      return roles;
    } catch (error) {
      this.logger.error(`Error fetching roles for user ${userId}:`, error);
      return [];
    }
  }

  /**
   * Check if user is super admin
   */
  async isSuperAdmin(userId: string): Promise<boolean> {
    return this.hasRole(userId, 'superAdmin');
  }

  /**
   * Check resource access
   */
  async checkResourceAccess(
    userId: string,
    resource: string,
    action: string,
    tenantId?: string
  ): Promise<AuthorizationResult> {
    try {
      const permission = `${resource}.${action}`;
      const hasPermission = await this.hasPermission(userId, permission, tenantId);

      if (hasPermission) {
        return { authorized: true };
      } else {
        return {
          authorized: false,
          reason: `User does not have permission ${permission}`,
        };
      }
    } catch (error) {
      this.logger.error(`Error checking resource access for user ${userId}:`, error);
      return {
        authorized: false,
        reason: 'Error checking resource access',
      };
    }
  }

  /**
   * Clear cache for a user
   */
  clearUserCache(userId: string, tenantId?: string): void {
    const permissionCacheKey = `${userId}_${tenantId || 'public'}`;
    const roleCacheKey = `${userId}_roles_${tenantId || 'public'}`;
    
    this.permissionCache.delete(permissionCacheKey);
    this.roleCache.delete(roleCacheKey);
    
    this.logger.log(`Cleared cache for user ${userId}`);
  }

  /**
   * Clear all cache
   */
  clearAllCache(): void {
    this.permissionCache.clear();
    this.roleCache.clear();
    this.logger.log('Cleared all authorization cache');
  }
}
