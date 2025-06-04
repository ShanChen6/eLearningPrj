import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, MinLength, IsArray, IsUUID, IsString, IsDateString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email?: string;

    @IsOptional()
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    password?: string;

    @IsOptional()
    @IsArray()
    @IsUUID("all", { each: true, message: 'Mỗi roleId phải là một UUID hợp lệ' })
    roleIds?: string[];

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Ngày sinh không đúng định dạng (YYYY-MM-DD)' })
    dateOfBirth?: Date;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsString()
    avatarUrl?: string;
}