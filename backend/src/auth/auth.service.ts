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

  async register({ nombreUsuario, contrasena, email }: RegisterDto) {
    const usuario = await this.usuarioService.findOneByEmail(email);

    if (usuario) {
      throw new BadRequestException('Usuario con el email ya existe');
    }

    await this.usuarioService.create({
      nombreUsuario,
      email,
      contrasena: await bcrypt.hash(contrasena, 10),
    });

    return {
      nombreUsuario,
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

    const token = await this.jwtService.signAsync(payload);

    return { token, email };
  }

  async profile({ email }: { email: string }) {
    return await this.usuarioService.findOneByEmail(email);
  }
}
