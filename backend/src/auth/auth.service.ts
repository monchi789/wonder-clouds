import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ usuario, contrasena, email }: RegisterDto) {
    const nombreUsuario = await this.usuarioService.findByEmail(email);

    if (nombreUsuario) {
      throw new BadRequestException('Usuario con el email ya existe');
    }

    await this.usuarioService.create({
      usuario,
      email,
      contrasena: await bcrypt.hash(contrasena, 10),
    });

    return {
      usuario,
      email,
    };
  }

  async login({ email, contrasena }: LoginDto) {
    const usuario = await this.usuarioService.findByEmailWithPassword(email);

    if (!usuario) {
      throw new UnauthorizedException('Contrasena o Email no son incorrectos');
    }

    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuario.contrasena,
    );

    if (!contrasenaValida) {
      throw new UnauthorizedException('Contrasena o Email no son incorrectos');
    }

    const payload = { email: usuario.email, rol: usuario.rol };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken, email };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const usuario = await this.usuarioService.findByEmail(payload.email);

      if (!usuario) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      const newAccessToken = await this.jwtService.signAsync(
        { email: usuario.email, rol: usuario.rol },
        { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' },
      );

      return { accessToken: newAccessToken, refreshToken };
    } catch {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  async profile({ email }: { email: string }) {
    return await this.usuarioService.findByEmail(email);
  }
}
