// import { Logger } from '@nestjs/common';
// import { hash } from 'bcrypt';
// import { AppDataSource } from '';
// import { User } from '../../common/entities/user.entity';
// import { Role } from '../../common/entities/role.entity';

// const logger = new Logger('SeedUsers');

// async function seedUsers() {
//     try {
//         await AppDataSource.initialize();
//         const userRepo = AppDataSource.getRepository(User);
//         const roleRepo = AppDataSource.getRepository(Role);

//         const studentRole = await roleRepo.findOneBy({ name: 'STUDENT' });
//         const instructorRole = await roleRepo.findOneBy({ name: 'INSTRUCTOR' });

//         if (!studentRole || !instructorRole) {
//             logger.error('Required roles not found. Seed roles first.');
//             process.exit(1);
//         }

//         const defaultUsers = [
//             {
//                 username: 'admin',
//                 email: 'admin@example.com',
//                 password: 'admin123',
//                 roles: [await roleRepo.findOneBy({ name: 'ADMIN' })],
//             },
//             {
//                 username: 'student1',
//                 email: 'student1@example.com',
//                 password: 'student123',
//                 roles: [studentRole],
//             },
//             {
//                 username: 'instructor1',
//                 email: 'instructor1@example.com',
//                 password: 'instructor123',
//                 roles: [instructorRole],
//             },
//         ];

//         for (const userData of defaultUsers) {
//             const exists = await userRepo.findOneBy({ email: userData.email });
//             if (exists) {
//                 logger.warn(`ℹUser already exists: ${userData.email}`);
//                 continue;
//             }

//             const hashedPassword = await hash(userData.password, 10);
//             const user = userRepo.create({
//                 ...userData,
//                 password: hashedPassword,
//                 createdAt: new Date(),
//                 active: true,
//             });

//             await userRepo.save(user);
//             logger.log(`Seeded user: ${user.email}`);
//         }

//         await AppDataSource.destroy();
//         logger.log('User seeding completed!');
//     } catch (error) {
//         logger.error('Failed to seed users', error.stack);
//         process.exit(1);
//     }
// }

// seedUsers();
