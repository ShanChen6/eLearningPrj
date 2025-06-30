import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Permission } from 'src/common/entities/permission.entity';
import { Permissions } from './decorators/permissions.decorator';
import { PermissionsGuard } from './guards/permissions.guard';
import { SearchPermissionsDto } from './dto/search-permissions.dto';

@Controller('permissions')
// @UseGuards(JwtAuthGuard, PermissionsGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  // ================== Permission Management ==================
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Permissions('role.manage')
  async create(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionsService.create(createPermissionDto);
  }

  // ================== Permission Management ==================
  // @Get()
  // @HttpCode(HttpStatus.OK)
  // @Permissions('role.manage', 'user.read')
  // async findAll(): Promise<Permission[]> {
  //   return this.permissionsService.findAll();
  // }

  // ================== Search Permissions ==================
  @Get('search')
  @HttpCode(HttpStatus.OK)
  @Permissions('role.manage', 'user.read')
  async search(@Query() query: SearchPermissionsDto): Promise<{ data: Permission[]; total: number; page: number; limit: number }> {
    return this.permissionsService.search(query);
  }

  // ================== Permission Management ==================
  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @Permissions('role.manage')
  async restore(@Param('id') id: string): Promise<Permission> {
    return this.permissionsService.restore(id);
  }

  // ================== Permission Management ==================
  @Delete(':id/force')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('role.manage')
  async remove(@Param('id') id: string): Promise<void> {
    await this.permissionsService.remove(id);
  }

  // ================== Permission Management ==================
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Permissions('role.manage', 'user.read')
  async findOne(@Param('id') id: string): Promise<Permission> {
    return this.permissionsService.findOne(id);
  }

  // ================== Permission Management ==================
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Permissions('role.manage')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  // ================== Permission Management ==================
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content cho delete thành công
  @Permissions('role.manage')
  async softDelete(@Param('id') id: string): Promise<void> {
    await this.permissionsService.softDelete(id);
  }
}

