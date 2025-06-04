import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRolePermissionsTable1749058969331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("Starting migration: CreateRolePermissionsTable");

        await queryRunner.createTable(
            new Table({
                name: 'role_permissions',
                columns: [
                    {
                        name: 'role_id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'permission_id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                ],
            }),
            true,
        );

        // Add Foreign Keys
        await queryRunner.createForeignKey(
            'role_permissions',
            new TableForeignKey({
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'roles',
                onDelete: 'CASCADE',
                name: 'FK_RolePermissions_RoleId',
            }),
        );

        await queryRunner.createForeignKey(
            'role_permissions',
            new TableForeignKey({
                columnNames: ['permission_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'permissions',
                onDelete: 'CASCADE',
                name: 'FK_RolePermissions_PermissionId',
            }),
        );
        console.log("Created 'role_permissions' table and added foreign keys.");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log("Starting rollback for migration: CreateRolePermissionsTable");
        await queryRunner.dropForeignKey('role_permissions', 'FK_RolePermissions_PermissionId');
        await queryRunner.dropForeignKey('role_permissions', 'FK_RolePermissions_RoleId');
        await queryRunner.dropTable('role_permissions');
        console.log("Dropped 'role_permissions' table.");
    }

}
