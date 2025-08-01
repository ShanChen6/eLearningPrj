import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true; // Không có yêu cầu về role, cho phép truy cập
        }

        const { user } = context.switchToHttp().getRequest();
        // user.roles sẽ là mảng các tên role từ JwtStrategy
        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}