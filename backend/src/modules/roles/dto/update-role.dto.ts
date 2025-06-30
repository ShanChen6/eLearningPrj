import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsString, IsOptional, IsArray, IsUUID } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @IsArray()
    @IsUUID('4', { each: true })
    @IsOptional()
    permissionIds?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    permissionNames?: string[];
}