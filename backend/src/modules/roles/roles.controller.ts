import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permissions } from '../permissions/decorators/permissions.decorator';
import { Role } from 'src/common/entities/role.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../permissions/guards/permissions.guard';
import { SearchRolesDto } from './dto/search-roles.dto';

@Controller('roles')
// @UseGuards(JwtAuthGuard, PermissionsGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  // ======================= Role Management =========================
  // =================================================================
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Permissions('role.manage')
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  // ======================= Search Roles =========================
  // ==============================================================
  @Get('search')
  @HttpCode(HttpStatus.OK)
  @Permissions('role.manage', 'user.read')
  async search(@Query() query: SearchRolesDto): Promise<{ data: Role[]; total: number; page: number; limit: number }> {
    return this.rolesService.search(query);
  }

  // ======================= Role Management =========================
  // =================================================================
  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @Permissions('role.manage')
  async restore(@Param('id') id: string): Promise<Role> {
    return this.rolesService.restore(id);
  }

  // ======================= Role Management =========================
  // =================================================================
  @Delete(':id/force')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('role.manage')
  async remove(@Param('id') id: string): Promise<void> {
    await this.rolesService.remove(id);
  }

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // @Permissions('role.manage', 'user.read') // Ví dụ: admin hoặc người dùng có thể đọc user (để xem role của user)
  // async findAll(): Promise<Role[]> {
  //   return this.rolesService.findAll();
  // }

  // ======================= Find One Role =========================
  // ==============================================================
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Permissions('role.manage', 'user.read')
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }


  // @Get(':name')
  // @HttpCode(HttpStatus.OK)
  // @Permissions('role.manage', 'user.read')
  // async findOneByName(@Param('name') name: string): Promise<Role> {
  //   return this.rolesService.findByName(name);
  // }

  // ======================= Update Role =========================
  // =============================================================
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Permissions('role.manage')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.rolesService.update(id, updateRoleDto);
  }

  // ==================== soft delete ===================
  // ====================================================
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('role.manage')
  async softDelete(@Param('id') id: string): Promise<void> {
    await this.rolesService.softDelete(id);
  }
}
