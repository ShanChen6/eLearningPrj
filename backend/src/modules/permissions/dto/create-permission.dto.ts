import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty({ message: 'Tên quyền không được để trống' })
    @MaxLength(100, { message: 'Tên quyền không được vượt quá 100 ký tự' })
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}