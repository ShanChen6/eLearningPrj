import { Permission } from 'src/common/entities/permission.entity';
import { Role } from 'src/common/entities/role.entity';
import { DataSource } from 'typeorm';

export class RolesSeeder {
    public async run(dataSource: DataSource): Promise<void> {
        const roleRepository = dataSource.getRepository(Role);
        const permissionRepository = dataSource.getRepository(Permission);

        // Fetch all existing permissions to assign to roles
        const allPermissions = await permissionRepository.find();

        const rolesToSeed = [
            {
                name: 'admin',
                description: 'Administrator with full access',
                permissions: allPermissions,
            },
            {
                name: 'instructor',
                description: 'Can create and manage courses',
                permissions: allPermissions.filter(p =>
                    [
                        'course.create', 'course.read_own', 'course.update_own', 'course.delete_own',
                        'lesson.manage_own', 'quiz.manage_own', 'blog.create', 'blog.comment'
                    ].includes(p.name)
                ),
            },
            {
                name: 'student',
                description: 'Can enroll in and view courses',
                permissions: allPermissions.filter(p =>
                    ['course.read_all', 'blog.comment'].includes(p.name)
                ),
            },
        ];

        // console.log('\n--- Seeding Roles ---');
        for (const roleData of rolesToSeed) {
            let role = await roleRepository.findOne({ where: { name: roleData.name }, relations: ['permissions'] });
            if (!role) {
                const newRole = roleRepository.create(roleData);
                await roleRepository.save(newRole);
                console.log(`- Role "${newRole.name}" seeded.`);
            } else {
                // Update permissions for existing role
                role.description = roleData.description;
                role.permissions = roleData.permissions; // Reassign the permissions array
                await roleRepository.save(role);
                console.log(`- Role "${role.name}" already exists, updated permissions.`);
            }
        }
    }
}