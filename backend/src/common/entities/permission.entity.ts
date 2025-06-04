import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { Role } from '../../common/entities/role.entity';

@Entity('permissions')
export class Permission extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 100,
        unique: true
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