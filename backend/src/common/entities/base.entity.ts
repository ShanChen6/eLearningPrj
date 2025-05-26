import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        name: 'created_at',
        nullable: true,
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;

    @Column({
        name: 'created_by',
        type: 'uuid',
        nullable: true
    })
    createdBy: string

    @Column({
        name: 'modified_at',
        type: 'timestamp with time zone',
        nullable: true
    })
    modifiedAt: Date

    @Column({
        name: 'modified_by',
        type: 'uuid',
        nullable: true
    })
    modifiedBy: string

    @Column({
        name: 'deleted_at',
        nullable: true
    })
    deletedAt: Date

    @Column({
        name: 'deleted_by',
        type: 'uuid',
        nullable: true
    })
    deletedBy: string

    @Column({
        default: true
    })
    active: boolean
}