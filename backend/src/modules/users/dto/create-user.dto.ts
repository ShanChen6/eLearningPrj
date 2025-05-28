// create-user.dto.ts
export class CreateUserDto {
    username: string;
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: Date;
    bio?: string;
    avatarUrl?: string;
}
