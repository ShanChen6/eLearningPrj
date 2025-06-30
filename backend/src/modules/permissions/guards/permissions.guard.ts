import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredPermissions) {
            return true; // Không có yêu cầu về permission, cho phép truy cập
        }

        const { user } = context.switchToHttp().getRequest();
        // user.permissions sẽ là mảng các tên permission từ JwtStrategy
        const hasPermission = requiredPermissions.some((permission) => user.permissions?.includes(permission));

        if (!hasPermission) {
            throw new ForbiddenException('Bạn không có quyền truy cập tài nguyên này.');
        }

        return true;
    }
}