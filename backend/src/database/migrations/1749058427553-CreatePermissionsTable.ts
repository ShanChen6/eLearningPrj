import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePermissionsTable1749058427553 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("Starting migration: CreatePermissionsTable");

        await queryRunner.createTable(
            new Table({
                name: 'permissions',
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
                    // Permission specific columns
                    {
                        name: 'name',
                        type: 'varchar',
                        length: "100",
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
        // Add unique constraint for name
        // await queryRunner.createUniqueConstraint('permissions', new TableUnique({ columnNames: ['name'] }));

        // console.log("Created 'permissions' table with unique constraint on name.");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log("Starting rollback for migration: CreatePermissionsTable");
        await queryRunner.dropTable('permissions');
        console.log("Dropped 'permissions' table.");
    }

}
