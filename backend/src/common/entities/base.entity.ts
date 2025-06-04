import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name: 'created_at',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;

    @Column({
        name: 'created_by',
        type: 'uuid',
        nullable: true
    })
    createdBy: string

    @UpdateDateColumn({
        name: 'modified_at',
        type: 'timestamp with time zone',
    })
    modifiedAt: Date

    @Column({
        name: 'modified_by',
        type: 'uuid',
        nullable: true
    })
    modifiedBy: string

    @DeleteDateColumn({
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