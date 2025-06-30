import { User } from "src/common/entities/user.entity";

export class AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    user: User;
}