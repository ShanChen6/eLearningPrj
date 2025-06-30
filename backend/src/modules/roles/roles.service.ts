import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/common/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Permission } from 'src/common/entities/permission.entity';
import { SearchRolesDto } from './dto/search-roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) { }

  // ======================= Find All =========================
  // ==========================================================
  // async findAll(): Promise<Role[]> {
  //   return this.rolesRepository.find({ relations: ['permissions'] });
  // }

  // ======================= Search Roles =========================
  // ==============================================================
  async search(query: SearchRolesDto): Promise<{ data: Role[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10, orderBy, sortOrder, q, name, description, active } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.rolesRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permission');

    // Logic tìm kiếm theo tiêu chí cụ thể
    if (name) {
      queryBuilder.andWhere('role.name ILIKE :name', { name: `%${name}%` });
    }
    if (description) {
      queryBuilder.andWhere('role.description ILIKE :description', { description: `%${description}%` });
    }
    if (active !== undefined) {
      queryBuilder.andWhere('role.active = :active', { active: active });
    }

    // Logic tìm kiếm Full-Text
    if (q) {
      queryBuilder.andWhere(
        '(role.name ILIKE :q OR role.description ILIKE :q)',
        { q: `%${q}%` }
      );
    }

    // Logic sắp xếp
    if (orderBy) {
      const validOrderFields = ['name', 'createdAt', 'updatedAt'];
      if (validOrderFields.includes(orderBy)) {
        queryBuilder.orderBy(`role.${orderBy}`, sortOrder);
      } else {
        queryBuilder.orderBy('role.createdAt', 'DESC');
      }
    } else {
      queryBuilder.orderBy('role.createdAt', 'DESC');
    }

    // Phân trang
    queryBuilder.skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total, page, limit };
  }

  // ======================= Find One =========================
  // ==========================================================
  async findOne(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions'], // Tải các quyền liên quan
    });
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found.`);
    }
    return role;
  }

  // ======================= Find By Name =========================
  // async findByName(name: string): Promise<Role> {
  //   const role = await this.rolesRepository.findOne({
  //     where: { name },
  //     relations: ['permissions'],
  //   });
  //   if (!role) {
  //     throw new NotFoundException(`Role with name "${name}" not found.`);
  //   }
  //   return role;
  // }

  // ======================== Create Role =========================
  // ==============================================================
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.rolesRepository.findOne({ where: { name: createRoleDto.name } });
    if (existingRole) {
      throw new ConflictException(`Role "${createRoleDto.name}" already exists.`);
    }

    const newRole = this.rolesRepository.create(createRoleDto);
    let permissionsToAssign: Permission[] = [];

    if (createRoleDto.permissionNames && createRoleDto.permissionNames.length > 0) {
      const permissionNames = createRoleDto.permissionNames;
      // 1. Tìm kiếm các quyền hiện có
      const existingPermissions = await this.permissionsRepository.find({
        where: {
          name: In(permissionNames)
        },
      });

      const existingPermissionNames = new Set(existingPermissions.map(p => p.name));
      const permissionsToCreateNames = permissionNames.filter(name => !existingPermissionNames.has(name));

      const newPermissions: Permission[] = [];
      if (permissionsToCreateNames.length > 0) {
        // 2. Tạo mới các quyền chưa tồn tại
        const createdPermissionsData = permissionsToCreateNames.map(name => ({
          name: name,
          description: `Auto-generated permission for ${name}`,
          active: true, // Mặc định là active
        }));
        const savedNewPermissions = await this.permissionsRepository.save(createdPermissionsData);
        newPermissions.push(...savedNewPermissions);
      }

      // Gộp các quyền đã tồn tại và quyền mới tạo
      permissionsToAssign = [...existingPermissions, ...newPermissions];
    }
    else if (createRoleDto.permissionIds && createRoleDto.permissionIds.length > 0) {
      const permissions = await this.permissionsRepository.findByIds(createRoleDto.permissionIds);
      if (permissions.length !== createRoleDto.permissionIds.length) {
        const foundIds = new Set(permissions.map(p => p.id));
        const notFoundIds = createRoleDto.permissionIds.filter(id => !foundIds.has(id));
        // Nếu sử dụng ID, chúng ta vẫn ném lỗi nếu ID không tồn tại
        throw new BadRequestException(`Permission with id are invalid: ${notFoundIds.join(', ')}`);
      }
      permissionsToAssign = permissions;
    }

    newRole.permissions = permissionsToAssign;
    return this.rolesRepository.save(newRole);
  }

  // ======================= Update Role =========================
  // =============================================================
  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
    if (!role) {
      throw new NotFoundException(`Role with id "${id}" not found`);
    }

    // Kiểm tra trùng tên nếu tên mới được cung cấp và khác tên cũ
    this.rolesRepository.merge(role, updateRoleDto);

    let permissionsToUpdate: Permission[] | undefined = undefined;

    if (updateRoleDto.permissionNames !== undefined) {
      const permissionNames = updateRoleDto.permissionNames;
      if (permissionNames.length > 0) {
        // 1. Tìm kiếm các quyền hiện có
        const existingPermissions = await this.permissionsRepository.find({
          where: { name: In(permissionNames) },
        });

        const existingPermissionNames = new Set(existingPermissions.map(p => p.name));
        const permissionsToCreateNames = permissionNames.filter(name => !existingPermissionNames.has(name));

        const newPermissions: Permission[] = [];
        if (permissionsToCreateNames.length > 0) {
          // 2. Tạo mới các quyền chưa tồn tại
          const createdPermissionsData = permissionsToCreateNames.map(name => ({
            name: name,
            description: `Auto-generated permission for ${name}`,
            active: true,
          }));
          const savedNewPermissions = await this.permissionsRepository.save(createdPermissionsData);
          newPermissions.push(...savedNewPermissions);
        }
        permissionsToUpdate = [...existingPermissions, ...newPermissions];
      } else {
        permissionsToUpdate = [];
      }
    }
    else if (updateRoleDto.permissionIds !== undefined) {
      if (updateRoleDto.permissionIds.length > 0) {
        const permissions = await this.permissionsRepository.findByIds(updateRoleDto.permissionIds);
        if (permissions.length !== updateRoleDto.permissionIds.length) {
          const foundIds = new Set(permissions.map(p => p.id));
          const notFoundIds = updateRoleDto.permissionIds.filter(id => !foundIds.has(id));
          throw new BadRequestException(`Permission with id are invalid: ${notFoundIds.join(', ')}`);
        }
        permissionsToUpdate = permissions;
      } else {
        permissionsToUpdate = [];
      }
    }

    if (permissionsToUpdate !== undefined) {
      role.permissions = permissionsToUpdate;
    }

    return this.rolesRepository.save(role);
  }

  // ==================== soft delete ===================
  // ====================================================
  async softDelete(id: string): Promise<void> {
    const result = await this.rolesRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role with id "${id}" not found.`);
    }
  }

  // ==================== restore soft-deleted role ===================
  // ==================================================================
  async restore(id: string): Promise<Role> {
    const result = await this.rolesRepository.restore(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role with id "${id}" not found.`);
    }
    return this.findOne(id);
  }

  // ==================== permanently delete role ===================
  // ================================================================
  async remove(id: string): Promise<void> {
    const result = await this.rolesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role with id "${id}" not found.`);
    }
  }
}
