import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "src/config/jwt.config";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/common/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @Inject(jwtConfig.KEY)
        private jwtConfiguration: ConfigType<typeof jwtConfig>) {

        if (!jwtConfiguration.secret) {
            throw new Error('JWT secret is not defined in configuration');
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfiguration.secret,
        })
    }
    async validate(payload: AuthJwtPayload) {
        const user = await this.usersRepository.findOne({
            where: {
                id: payload.sub
            }
        });
        if (!user || !user.active) {
            throw new UnauthorizedException('Người dùng không tồn tại hoặc không hoạt động');
        }
        return {
            id: payload.sub,
        }
    }
}