import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../common/entities/role.entity';
import { Permission } from '../../common/entities/permission.entity';
// import { RoleSeeder } from './role.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  providers: [
    RolesService,
    // RoleSeeder
  ],
  controllers: [RolesController],
  exports: [RolesService, TypeOrmModule],
})
export class RolesModule { }
