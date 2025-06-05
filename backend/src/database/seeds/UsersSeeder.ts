import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/common/entities/user.entity';
import { Role } from 'src/common/entities/role.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export class UsersSeeder {
    public async run(dataSource: DataSource): Promise<void> {
        const userRepository = dataSource.getRepository(User);
        const roleRepository = dataSource.getRepository(Role);

        // Lấy thông tin admin từ biến môi trường
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'default_admin';
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'default_admin@example.com';
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'default_admin_password';

        if (!ADMIN_USERNAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
            console.error("Thiếu biến môi trường cho người dùng admin (ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD). Không thể seed người dùng admin.");
            return;
        }

        // console.log('\n--- Seeding Users ---');
        const existingAdmin = await userRepository.findOne({ where: { email: ADMIN_EMAIL }, relations: ['roles'] });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
            const adminRole = await roleRepository.findOne({ where: { name: 'admin' } });

            if (!adminRole) {
                console.error("Admin role not found. Cannot seed admin user. Please run RolesSeeder first.");
                return;
            }

            const adminUser = userRepository.create({
                username: ADMIN_USERNAME,
                email: ADMIN_EMAIL,
                password: hashedPassword,
                roles: [adminRole], // Assign admin role
            });
            await userRepository.save(adminUser);
            console.log('Admin user seeded successfully with admin role!');
        } else {
            console.log('Admin user already exists, skipping user seed.');
            // Update role if admin user exists but doesn't have the role
            const adminRole = await roleRepository.findOne({ where: { name: 'admin' } });
            if (existingAdmin && adminRole && !existingAdmin.roles?.some(r => r.id === adminRole.id)) {
                existingAdmin.roles = existingAdmin.roles ? [...existingAdmin.roles, adminRole] : [adminRole];
                await userRepository.save(existingAdmin);
                console.log('Admin user updated with admin role.');
            }
        }
    }
}
