// src/roles/entities/role.entity.ts
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Permission } from '../entities/permission.entity';

@Entity('roles')
export class Role extends BaseEntity {
    @Column({ type: 'varchar', length: 100, unique: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    // Quan hệ ManyToMany với UserEntity: Một vai trò có thể được gán cho nhiều người dùng
    @ManyToMany(() => User, user => user.roles)
    users: User[];

    // Quan hệ ManyToMany với PermissionEntity: Một vai trò có thể có nhiều quyền
    @ManyToMany(() => Permission, permission => permission.roles, { cascade: true, eager: false })
    @JoinTable({
        name: 'role_permissions', // Tên bảng trung gian
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    })
    permissions: Permission[];
}