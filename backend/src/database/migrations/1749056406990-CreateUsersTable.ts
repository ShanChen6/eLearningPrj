import { MigrationInterface, QueryRunner, Table, TableIndex, TableUnique } from "typeorm";

export class CreateUsersTable1749056406990 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("Starting migration: CreateUsersTable");

        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid'
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
                    // User specific columns
                    {
                        name: 'username',
                        type: 'varchar',
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: 'phoneNumber',
                        type: 'varchar',
                        length: "50",
                        isNullable: true,
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        length: "500",
                        isNullable: true,
                    },
                    {
                        name: 'dateOfBirth',
                        type: 'date',
                        isNullable: true,
                    },
                    {
                        name: 'bio',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'avatarUrl',
                        type: 'varchar',
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: 'refreshToken',
                        type: 'varchar',
                        length: "500",
                        isNullable: true,
                    },
                    {
                        name: 'googleId',
                        type: 'varchar',
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: 'facebookId',
                        type: 'varchar',
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: 'githubId',
                        type: 'varchar',
                        length: "255",
                        isNullable: true,
                    },
                ],
            }),
            true, // If table already exists, will not throw an error
        );
        // // Add unique constraint for email
        // await queryRunner.createUniqueConstraint('users', new TableUnique({ columnNames: ['email'] }));
        // // Add index for email for faster lookups
        // await queryRunner.createIndex('users', new TableIndex({ columnNames: ['email'] }));

        // console.log("Created 'users' table with unique constraint and index on email.");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log("Starting rollback for migration: CreateUsersTable");
        await queryRunner.dropTable('users');
        console.log("Dropped 'users' table.");
    }

}
