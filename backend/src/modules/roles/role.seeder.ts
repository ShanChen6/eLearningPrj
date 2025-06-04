// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Role } from '../../common/entities/role.entity';

// @Injectable()
// export class RoleSeeder implements OnModuleInit {
//     constructor(
//         @InjectRepository(Role)
//         private readonly roleRepository: Repository<Role>,
//     ) { }

//     async onModuleInit() {
//         await this.seedRoles();
//     }

//     private async seedRoles() {
//         const defaultRoles = [
//             { name: 'ADMIN', description: 'Quản trị hệ thống' },
//             { name: 'INSTRUCTOR', description: 'Giảng viên' },
//             { name: 'STUDENT', description: 'Học viên' },
//         ];

//         for (const roleData of defaultRoles) {
//             const existing = await this.roleRepository.findOne({ where: { name: roleData.name } });
//             if (!existing) {
//                 await this.roleRepository.save(roleData);
//                 console.log(`Seeded role: ${roleData.name}`);
//             } else {
//                 console.log(`Role ${roleData.name} already exists.`);
//             }
//         }
//     }
// }
