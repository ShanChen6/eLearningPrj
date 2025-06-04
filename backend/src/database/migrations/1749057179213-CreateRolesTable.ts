import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class CreateRolesTable1749057179213 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("Starting migration: CreateRolesTable");

        await queryRunner.createTable(
            new Table({
                name: 'roles',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    // BaseEntity columns
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                    {
                        name: 'created_by',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'modified_at',
                        type: 'timestamp with time zone',
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp with time zone',
                        isNullable: true,
                    },
                    {
                        name: 'deleted_by',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'active',
                        type: 'boolean',
                        default: true,
                        isNullable: false,
                    },
                    // Role specific columns
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '100',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                ],
            }),
            true,
        );
        // // Add unique constraint for name
        // await queryRunner.createUniqueConstraint('roles', new TableUnique({ columnNames: ['name'] }));

        // console.log("Created 'roles' table with unique constraint on name.");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log("Starting rollback for migration: CreateRolesTable");
        await queryRunner.dropTable('roles');
        console.log("Dropped 'roles' table.");
    }

}
