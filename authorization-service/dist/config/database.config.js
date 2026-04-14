"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSourceOptions = exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
exports.dataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "admin@123",
    database: process.env.DB_NAME || "saas-pos",
    schema: "public",
    synchronize: false,
    ssl: process.env.DB_SSL === "true",
    entities: [__dirname + "/../entities/*.entity{.ts,.js}"],
    migrations: ["migrations/*{.ts,.js}"],
};
exports.appDataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "admin@123",
    database: process.env.DB_NAME || "saas-pos",
    schema: "public",
    synchronize: false,
    ssl: process.env.DB_SSL === "true",
    entities: [__dirname + "/../entities/*.entity{.ts,.js}"],
};
exports.default = new typeorm_1.DataSource(exports.dataSourceOptions);
//# sourceMappingURL=database.config.js.map