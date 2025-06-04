import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserRolesTable1749058911541 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("Starting migration: CreateUserRolesTable");

        await queryRunner.createTable(
            new Table({
                name: 'user_roles',
                columns: [
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'role_id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                ],
            }),
            true,
        );

        // Add Foreign Keys
        await queryRunner.createForeignKey(
            'user_roles',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                name: 'FK_UserRoles_UserId',
            }),
        );

        await queryRunner.createForeignKey(
            'user_roles',
            new TableForeignKey({
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'roles',
                onDelete: 'CASCADE',
                name: 'FK_UserRoles_RoleId',
            }),
        );
        console.log("Created 'user_roles' table and added foreign keys.");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log("Starting rollback for migration: CreateUserRolesTable");
        await queryRunner.dropForeignKey('user_roles', 'FK_UserRoles_RoleId');
        await queryRunner.dropForeignKey('user_roles', 'FK_UserRoles_UserId');
        await queryRunner.dropTable('user_roles');
        console.log("Dropped 'user_roles' table.");
    }

}
