import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdatePermissionDto {
    @IsString()
    @IsOptional()
    @MaxLength(100, { message: 'Tên quyền không được vượt quá 100 ký tự' })
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;
}