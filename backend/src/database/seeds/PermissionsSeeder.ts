import { Permission } from 'src/common/entities/permission.entity';
import { DataSource } from 'typeorm';

export class PermissionsSeeder {
    public async run(dataSource: DataSource): Promise<void> {
        const permissionRepository = dataSource.getRepository(Permission);

        const permissionsToSeed = [
            { name: 'user.manage', description: 'Manage all users (create, read, update, delete)' },
            { name: 'user.read', description: 'Read user profiles' },
            { name: 'role.manage', description: 'Manage roles and permissions' },
            { name: 'course.create', description: 'Create new courses' },
            { name: 'course.read_all', description: 'Read all courses' },
            { name: 'course.read_own', description: 'Read courses owned by the instructor' },
            { name: 'course.update_own', description: 'Update courses owned by the instructor' },
            { name: 'course.delete_own', description: 'Delete courses owned by the instructor' },
            { name: 'lesson.manage_own', description: 'Manage lessons in own courses' },
            { name: 'enrollment.manage', description: 'Manage course enrollments' },
            { name: 'payment.view_all', description: 'View all payments' },
            { name: 'quiz.manage_own', description: 'Manage quizzes in own courses' },
            { name: 'blog.create', description: 'Create blog posts' },
            { name: 'blog.manage_all', description: 'Manage all blog posts' },
            { name: 'blog.comment', description: 'Comment on blog posts' },
            { name: 'certificate.issue', description: 'Issue certificates' },
            { name: 'dashboard.view_admin', description: 'View admin dashboard statistics' },
        ];

        console.log('\n--- Seeding Permissions ---');
        for (const permData of permissionsToSeed) {
            let permission = await permissionRepository.findOne({ where: { name: permData.name } });
            if (!permission) {
                permission = permissionRepository.create(permData);
                await permissionRepository.save(permission);
                console.log(`- Permission "${permission.name}" seeded.`);
            } else {
                console.log(`- Permission "${permission.name}" already exists, skipping seed.`);
            }
        }
    }
}