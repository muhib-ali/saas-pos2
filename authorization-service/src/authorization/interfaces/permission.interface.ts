export interface Permission {
  id: string;
  module_id: string;
  title: string;
  slug: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Role {
  id: string;
  title: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

export interface RolePermission {
  id: string;
  role_id: string;
  permission_id: string;
  module_slug: string;
  permission_slug: string;
  is_allowed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserPermissions {
  userId: string;
  permissions: Permission[];
  roles: Role[];
}

export interface AuthorizationResult {
  authorized: boolean;
  reason?: string;
}
