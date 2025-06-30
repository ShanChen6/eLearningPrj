import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService, registerAs } from '@nestjs/config';

export default registerAs(
    "jwt",
    (): JwtModuleOptions => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        },
    }));

// Hàm riêng để lấy Refresh Token expiration (không dùng trong JwtModuleOptions)
export const getJwtRefreshTokenConfig = (configService: ConfigService): { expiresIn: string } => ({
    expiresIn: configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME') ?? '',
});
