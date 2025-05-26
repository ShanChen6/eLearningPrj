// src/roles/entities/permission.entity.ts
import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Role } from './role.entity';

export enum PermissionAction {
    MANAGE = 'manage', // all actions on the subject
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete',
}

@Entity('permissions')
export class Permission extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
        comment: 'Unique permission name, e.g., CREATE_COURSE'
    })
    name: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[];
}