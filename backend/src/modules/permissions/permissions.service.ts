import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/common/entities/permission.entity';
import { Repository } from 'typeorm';
import { SearchPermissionsDto } from './dto/search-permissions.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
  ) { }

  // ================ Find All Permission ==================
  // async findAll(): Promise<Permission[]> {
  //   return this.permissionsRepository.find();
  // }

  // ===================== Search Permissions ====================
  async search(query: SearchPermissionsDto): Promise<{ data: Permission[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10, orderBy, sortOrder, q, name, description, active } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.permissionsRepository.createQueryBuilder('permission');

    // Logic tìm kiếm theo tiêu chí cụ thể
    if (name) {
      queryBuilder.andWhere('permission.name ILIKE :name', { name: `%${name}%` });
    }
    if (description) {
      queryBuilder.andWhere('permission.description ILIKE :description', { description: `%${description}%` });
    }
    if (active !== undefined) {
      queryBuilder.andWhere('permission.active = :active', { active: active });
    }

    // Logic tìm kiếm Full-Text
    if (q) {
      queryBuilder.andWhere(
        '(permission.name ILIKE :q OR permission.description ILIKE :q)',
        { q: `%${q}%` }
      );
    }

    // Logic sắp xếp
    if (orderBy) {
      const validOrderFields = ['name', 'createdAt', 'updatedAt'];
      if (validOrderFields.includes(orderBy)) {
        queryBuilder.orderBy(`permission.${orderBy}`, sortOrder);
      } else {
        queryBuilder.orderBy('permission.createdAt', 'DESC');
      }
    } else {
      queryBuilder.orderBy('permission.createdAt', 'DESC');
    }

    // Phân trang
    queryBuilder.skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total, page, limit };
  }

  // ====================== Find By ID ======================
  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionsRepository.findOne({
      where: {
        id
      }
    });
    if (!permission) {
      throw new NotFoundException(`Permission with id "${id}" not found`);
    }
    return permission;
  }

  // ================= create new permission ================
  // ========================================================
  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const existingPermission = await this.permissionsRepository.findOne({
      where: {
        name: createPermissionDto.name
      },
    });

    if (existingPermission) {
      throw new ConflictException(`Permission "${createPermissionDto.name}" already exists.`);
    }

    const newPermission = this.permissionsRepository.create(createPermissionDto);
    return await this.permissionsRepository.save(newPermission);
  }

  // ===================== update permission ====================
  async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.permissionsRepository.findOne({
      where: {
        id
      }
    });
    if (!permission) {
      throw new NotFoundException(`Permission with Id "${id}" not found.`);
    }

    // Kiểm tra trùng tên nếu tên mới được cung cấp và khác tên cũ
    if (updatePermissionDto.name && updatePermissionDto.name !== permission.name) {
      const existingPermission = await this.permissionsRepository.findOne({
        where: {
          name: updatePermissionDto.name
        },
      });
      if (existingPermission && existingPermission.id !== id) {
        throw new ConflictException(`Permission "${updatePermissionDto.name}" already exists.`);
      }
    }

    this.permissionsRepository.merge(permission, updatePermissionDto);
    return await this.permissionsRepository.save(permission);
  }

  // ==================== soft delete ==================
  // ===================================================
  async softDelete(id: string): Promise<void> {
    const result = await this.permissionsRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Permission with id "${id}" not found.`);
    }
  }

  // ===================== restore permission ====================
  // =============================================================
  async restore(id: string): Promise<Permission> {
    const result = await this.permissionsRepository.restore(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Permission with id "${id}" not found.`);
    }
    return this.findOne(id);
  }

  // ===================== remove permission permanently ====================
  // ========================================================================
  async remove(id: string): Promise<void> {
    const result = await this.permissionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Permission with id "${id}" not found.`);
    }
  }
}
