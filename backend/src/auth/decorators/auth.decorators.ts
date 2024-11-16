import { applyDecorators, UseGuards } from '@nestjs/common';
import { Rol } from '../../common/enums/rol.enum';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from './roles.decorators';

export function Auth(...roles: Rol[]) {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
}
