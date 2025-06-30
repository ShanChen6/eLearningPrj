import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsArray, IsUUID } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean = true;

    @IsArray()
    @IsUUID('4', { each: true })
    @IsOptional()
    permissionIds?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ message: 'permissionNames không được để trống khi permissionIds không được cung cấp', each: true })
    @IsOptional()
    permissionNames?: string[];
}