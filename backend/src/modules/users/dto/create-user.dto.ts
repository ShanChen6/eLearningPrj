import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsArray, IsUUID, IsDateString, IsUrl } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Username không được để trống' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'Email không được để trống' })
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email: string;

    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    password: string;

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
    @IsUrl()
    @IsString()
    avatarUrl?: string;
}