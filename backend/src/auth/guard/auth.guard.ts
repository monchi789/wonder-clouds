import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Método `canActivate`: verifica si la solicitud contiene un token de autenticación válido.
   * Extrae el token del encabezado de autorización y lo verifica utilizando `jwtService`.
   * Si el token es válido, adjunta el `payload` decodificado en la solicitud como `request.user`.
   * Si el token no existe o es inválido, lanza una excepción de autenticación no autorizada.
   *
   * @param context - El contexto de ejecución que permite acceder al objeto de la solicitud HTTP.
   * @returns Un `boolean` indicando si la solicitud puede ser procesada (true).
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extracTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      request.user = payload;
    } catch {}

    return true;
  }

  /**
   * Método `extracTokenFromHeader`: extrae el token de autenticación del encabezado de autorización.
   * Verifica si el tipo de token es `Bearer`, en cuyo caso devuelve el token.
   * Si no está presente o no es de tipo `Bearer`, retorna `undefined`.
   *
   * @param request - La solicitud HTTP que contiene el encabezado de autorización.
   * @returns El token si es de tipo `Bearer`, o `undefined` si no se cumple esta condición.
   */
  private extracTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
