import { DataSource, DataSourceOptions } from "typeorm";

// Helper function to get tenant-specific schema
export function getTenantSchema(tenantId?: string): string {
  if (!tenantId) {
    return "public"; // Default schema for master admin
  }
  return `tenant_${tenantId}`;
}

// Base database configuration
const baseConfig = {
  type: "postgres" as const,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "admin@123",
  database: process.env.DB_NAME || "saas-pos",
  synchronize: false,
  ssl: process.env.DB_SSL === "true",
  entities: [__dirname + "/../entities/*.entity{.ts,.js}"],
  migrations: ["migrations/*{.ts,.js}"],
};

// Function to create dynamic data source options based on tenant
export function createDataSourceOptions(tenantId?: string): DataSourceOptions;
export function createDataSourceOptions(schemaName: string): DataSourceOptions;
export function createDataSourceOptions(tenantOrSchema?: string): DataSourceOptions {
  // Check if the parameter is a schema name (contains 'tenant_' or 'public')
  const isSchemaName = tenantOrSchema && (tenantOrSchema.includes('tenant_') || tenantOrSchema === 'public');
  const schema = isSchemaName ? tenantOrSchema : getTenantSchema(tenantOrSchema);
  
  return {
    ...baseConfig,
    schema,
  };
}

// Default configuration for migrations (public schema)
export const dataSourceOptions: DataSourceOptions = createDataSourceOptions();

// Runtime configuration will be created dynamically based on tenant
export const appDataSourceOptions: DataSourceOptions = createDataSourceOptions();

export default new DataSource(dataSourceOptions);
