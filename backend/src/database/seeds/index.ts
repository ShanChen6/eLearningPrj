// src/database/seeds/index.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Import individual seeders
import { PermissionsSeeder } from './PermissionsSeeder';
import { RolesSeeder } from './RolesSeeder';
import { UsersSeeder } from './UsersSeeder';
import { User } from 'src/common/entities/user.entity';
import { Role } from 'src/common/entities/role.entity';
import { Permission } from 'src/common/entities/permission.entity';

// Import your entities (ensure correct paths)

dotenv.config();

// TypeORM configuration for seeding
const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Role, Permission],
    synchronize: false,
    logging: false,
});

async function runAllSeeds() {
    await dataSource.initialize();
    console.log('Database connection initialized for seeding.');

    try {
        // Run seeders in order of dependency
        await new PermissionsSeeder().run(dataSource);
        await new RolesSeeder().run(dataSource);
        await new UsersSeeder().run(dataSource);
        // console.log('\nAll seeds completed successfully!');
    } catch (error) {
        console.error('Seeding process failed:', error);
    } finally {
        await dataSource.destroy();
        console.log('\nDatabase connection closed after seeding.');
    }
}

runAllSeeds().catch(error => {
    console.error('Error during seeding process:', error);
    process.exit(1);
});
