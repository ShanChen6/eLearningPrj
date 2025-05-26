import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../modules/users/user.entity';
import { Role } from '../../modules/roles/role.entity';
import { Permission } from '../../modules/roles/permission.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

// Định nghĩa tên các vai trò và quyền cơ bản
export const DEFAULT_ROLES = {
    ADMIN: 'ADMIN',
    INSTRUCTOR: 'INSTRUCTOR',
    STUDENT: 'STUDENT',
};

export const DEFAULT_PERMISSIONS = {
    // User Permissions
    MANAGE_USERS: 'MANAGE_USERS', // Admin
    VIEW_USERS: 'VIEW_USERS',     // Admin
    // Course Permissions
    MANAGE_COURSES: 'MANAGE_COURSES', // Admin
    CREATE_COURSE: 'CREATE_COURSE',   // Instructor
    UPDATE_OWN_COURSE: 'UPDATE_OWN_COURSE', // Instructor
    DELETE_OWN_COURSE: 'DELETE_OWN_COURSE', // Instructor
    VIEW_ALL_COURSES: 'VIEW_ALL_COURSES', // Student, Instructor, Admin
    ENROLL_COURSE: 'ENROLL_COURSE',   // Student
    // Lesson Permissions
    MANAGE_LESSONS: 'MANAGE_LESSONS', // Admin, Instructor (for their courses)
    CREATE_LESSON: 'CREATE_LESSON',
    UPDATE_LESSON: 'UPDATE_LESSON',
    DELETE_LESSON: 'DELETE_LESSON',
    VIEW_LESSON_CONTENT: 'VIEW_LESSON_CONTENT', // Enrolled Student, Instructor, Admin
    // Blog Permissions
    MANAGE_BLOG_POSTS: 'MANAGE_BLOG_POSTS', // Admin
    CREATE_BLOG_POST: 'CREATE_BLOG_POST', // Admin, (maybe Instructor)
    // ... thêm các quyền khác
};


@Injectable()
export class SeederService implements OnApplicationBootstrap {
    private readonly logger = new Logger(SeederService.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
        private readonly configService: ConfigService,
    ) { }

    async onApplicationBootstrap() {
        const seededRoles = await this.seedRoles();
        const seededPermissions = await this.seedPermissions();
        await this.assignPermissionsToRoles(seededRoles, seededPermissions);
        await this.seedAdminUser(seededRoles[DEFAULT_ROLES.ADMIN]);
    }

    private async seedRoles(): Promise<Record<string, Role>> {
        const rolesToSeed = [
            { name: DEFAULT_ROLES.ADMIN, description: 'Administrator with full access' },
            { name: DEFAULT_ROLES.INSTRUCTOR, description: 'User who can create and manage courses' },
            { name: DEFAULT_ROLES.STUDENT, description: 'User who can enroll in courses' },
        ];

        const seededRoles: Record<string, Role> = {};

        for (const roleData of rolesToSeed) {
            let role = await this.roleRepository.findOne({ where: { name: roleData.name } });
            if (!role) {
                role = this.roleRepository.create(roleData);
                await this.roleRepository.save(role);
                this.logger.log(`Role "${role.name}" created.`);
            }
            seededRoles[role.name] = role;
        }
        return seededRoles;
    }

    private async seedPermissions(): Promise<Record<string, Permission>> {
        const permissionsToSeed = Object.values(DEFAULT_PERMISSIONS).map(name => ({ name }));
        const seededPermissions: Record<string, Permission> = {};

        for (const permData of permissionsToSeed) {
            let permission = await this.permissionRepository.findOne({ where: { name: permData.name } });
            if (!permission) {
                permission = this.permissionRepository.create(permData);
                await this.permissionRepository.save(permission);
                this.logger.log(`Permission "${permission.name}" created.`);
            }
            seededPermissions[permission.name] = permission;
        }
        return seededPermissions;
    }

    private async assignPermissionsToRoles(
        roles: Record<string, Role>,
        permissions: Record<string, Permission>,
    ): Promise<void> {
        const rolePermissionsMap: Record<string, string[]> = {
            [DEFAULT_ROLES.ADMIN]: [
                DEFAULT_PERMISSIONS.MANAGE_USERS,
                DEFAULT_PERMISSIONS.VIEW_USERS,
                DEFAULT_PERMISSIONS.MANAGE_COURSES,
                DEFAULT_PERMISSIONS.VIEW_ALL_COURSES,
                DEFAULT_PERMISSIONS.MANAGE_LESSONS,
                DEFAULT_PERMISSIONS.VIEW_LESSON_CONTENT,
                DEFAULT_PERMISSIONS.MANAGE_BLOG_POSTS,
                DEFAULT_PERMISSIONS.CREATE_BLOG_POST,
            ],
            [DEFAULT_ROLES.INSTRUCTOR]: [
                DEFAULT_PERMISSIONS.CREATE_COURSE,
                DEFAULT_PERMISSIONS.UPDATE_OWN_COURSE,
                DEFAULT_PERMISSIONS.DELETE_OWN_COURSE,
                DEFAULT_PERMISSIONS.VIEW_ALL_COURSES,
                DEFAULT_PERMISSIONS.CREATE_LESSON, // Assuming tied to their course
                DEFAULT_PERMISSIONS.UPDATE_LESSON,
                DEFAULT_PERMISSIONS.DELETE_LESSON,
                DEFAULT_PERMISSIONS.VIEW_LESSON_CONTENT,
            ],
            [DEFAULT_ROLES.STUDENT]: [
                DEFAULT_PERMISSIONS.VIEW_ALL_COURSES,
                DEFAULT_PERMISSIONS.ENROLL_COURSE,
                DEFAULT_PERMISSIONS.VIEW_LESSON_CONTENT, // only for enrolled courses (logic in guard)
            ],
        };

        for (const roleName in rolePermissionsMap) {
            const role = roles[roleName];
            if (!role) continue;

            const permissionNames = rolePermissionsMap[roleName];
            const permissionsToAssign = permissionNames.map(name => permissions[name]).filter(Boolean);

            // Eager load current permissions to avoid duplicates if re-run
            const currentRole = await this.roleRepository.findOne({
                where: { id: role.id },
                relations: ['permissions'],
            });

            if (currentRole) {
                const currentPermissionIds = new Set(currentRole.permissions.map(p => p.id));
                const newPermissions = permissionsToAssign.filter(p => !currentPermissionIds.has(p.id));

                if (newPermissions.length > 0) {
                    currentRole.permissions = [...currentRole.permissions, ...newPermissions];
                    await this.roleRepository.save(currentRole);
                    this.logger.log(`Assigned ${newPermissions.length} new permissions to role "${role.name}".`);
                }
            }
        }
    }

    private async seedAdminUser(adminRole: Role) {
        if (!adminRole) {
            this.logger.error('Admin role not found. Cannot seed admin user.');
            return;
        }

        const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
        const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');
        // ... (các thông tin admin khác)

        if (!adminEmail || !adminPassword) {
            // ... (log warning)
            return;
        }

        try {
            const existingAdmin = await this.userRepository.findOne({
                where: { email: adminEmail },
                relations: ['roles'], // Load roles để kiểm tra
            });

            if (existingAdmin && existingAdmin.roles.some(role => role.id === adminRole.id)) {
                this.logger.log('Admin user with ADMIN role already exists.');
                return;
            }

            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            const adminUser = this.userRepository.create({
                email: adminEmail,
                password: hashedPassword,
                ...(this.configService.get<string>('ADMIN_FIRST_NAME') && { firstName: this.configService.get<string>('ADMIN_FIRST_NAME', 'Admin') }),
                ...(this.configService.get<string>('ADMIN_LAST_NAME') && { lastName: this.configService.get<string>('ADMIN_LAST_NAME', 'User') }),
                isEmailVerified: true,
                active: true,
                roles: [adminRole], // Gán RoleEntity cho admin
            } as Partial<User>);

            await this.userRepository.save(adminUser);
            this.logger.log('Admin user created and assigned ADMIN role successfully.');

        } catch (error) {
            this.logger.error('Error seeding admin user:', error.stack);
        }
    }
}