// // src/users/mock/mock-admin.ts
// import { DataSource } from 'typeorm';
// import { User } from '../../common/entities/user.entity';
// import { Role } from '../../common/entities/role.entity';
// import * as bcrypt from 'bcrypt';

// export async function createInitialAdmin(dataSource: DataSource) {
//     const userRepo = dataSource.getRepository(User);
//     const roleRepo = dataSource.getRepository(Role);

//     const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
//     const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

//     // Nếu user admin đã tồn tại, không tạo nữa
//     const existingAdmin = await userRepo.findOne({ where: { email: adminEmail } });
//     if (existingAdmin) {
//         // console.log('Admin user đã tồn tại.');
//         return;
//     }

//     const adminRole = await roleRepo.findOne({ where: { name: 'ADMIN' } });
//     if (!adminRole) {
//         throw new Error('Role ADMIN chưa được seed.');
//     }

//     const hashedPassword = await bcrypt.hash(adminPassword, 10);

//     const adminUser = userRepo.create({
//         username: 'admin',
//         email: process.env.ADMIN_EMAIL || 'admin@example.com',
//         password: hashedPassword,
//         roles: [adminRole],
//     });

//     await userRepo.save(adminUser);
//     // console.log('Admin user đã được tạo thành công.');
// }
