// ormconfig.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { CreateUsersTable1749056406990 } from 'src/database/migrations/1749056406990-CreateUsersTable';
import { CreateRolesTable1749057179213 } from 'src/database/migrations/1749057179213-CreateRolesTable';
import { CreatePermissionsTable1749058427553 } from 'src/database/migrations/1749058427553-CreatePermissionsTable';
import { CreateUserRolesTable1749058911541 } from 'src/database/migrations/1749058911541-CreateUserRolesTable';
import { CreateRolePermissionsTable1749058969331 } from 'src/database/migrations/1749058969331-CreateRolePermissionsTable';

dotenv.config();

// Định nghĩa cấu hình DataSourceOptions
const config: DataSourceOptions = {
    type: 'postgres',
    host: `localhost`,
    port: 5432,
    username: `postgres`,
    password: `postgres`,
    database: `postgres`,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [
        CreateUsersTable1749056406990,
        CreateRolesTable1749057179213,
        CreatePermissionsTable1749058427553,
        CreateUserRolesTable1749058911541,
        CreateRolePermissionsTable1749058969331
    ],
    migrationsTableName: 'migrations',
    synchronize: false,
    logging: true,
};

// Khởi tạo và export một instance của DataSource
const dataSource = new DataSource(config);
export default dataSource;