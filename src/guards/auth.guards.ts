
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorators/roles.decorator';

const dummyUser = {
    id: 1,
    username: "owalishawon",
    role: "admin"
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const roles = this.reflector.getAllAndMerge(Roles, [context.getHandler(), context.getClass()]);
        const type = context.getType()

        return validateRequest(request, roles);
    }
}

function validateRequest(request: any, roles: string[]): boolean | Promise<boolean> | Observable<boolean> {
    if (roles.includes(dummyUser.role)) {
        return true
    }

    return false

}

