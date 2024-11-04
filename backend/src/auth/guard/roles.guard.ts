import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Rol } from 'src/common/enums/rol.enum';
import { ROLES_KEY } from '../constants/roles.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const rol = this.reflector.getAllAndOverride<Rol>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!rol) {
        return true;
      }

      const { user } = context.switchToHttp().getRequest();

      return rol.includes(user.rol);
    } catch {
      throw new UnauthorizedException('Token no valido');
    }
  }
}
