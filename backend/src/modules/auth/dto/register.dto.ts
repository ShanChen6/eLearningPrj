import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty({ message: 'Tên người dùng không được để trống.' })
    @IsString({ message: 'Tên người dùng phải là chuỗi.' })
    username: string;

    @IsNotEmpty({ message: 'Email không được để trống.' })
    @IsEmail({}, { message: 'Email không hợp lệ.' })
    email: string;

    @IsNotEmpty({ message: 'Mật khẩu không được để trống.' })
    @IsString({ message: 'Mật khẩu phải là chuỗi.' })
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' })
    password: string;
}