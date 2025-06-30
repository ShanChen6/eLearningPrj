import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/common/entities/role.entity";
import { User } from "src/common/entities/user.entity";
import { RegisterDto } from "./dto/register.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { LoginDto } from "./dto/login.dto";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { RolesService } from '../roles/roles.service';
import { Permission } from 'src/common/entities/permission.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  // ==================== Public Methods ====================
  // =================Đăng ký (Registration)=================
  // AuthModule responsible for initial user creation with default roles
  async register(registerDto: RegisterDto) { }

  // ================= Đăng nhập (Login) =================
  // AuthModule handles authentication and token generation

  // ================= Refresh Tokens =====================
  // AuthModule handles token refreshing logic

  // ================= Logout ====================
  // AuthModule handles token invalidation

}
