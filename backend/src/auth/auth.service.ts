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
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ usuario, contrasena, email }: RegisterDto) {
    const nombreUsuario = await this.usuarioService.findByEmail(email);

    if (nombreUsuario) {
      throw new BadRequestException('Usuario con el email ya existe');
    }

    const hashedPassword = await bcrypt.hash(contrasena, this.SALT_ROUNDS);
    console.log('Hashed password on registration:', hashedPassword);

    await this.usuarioService.create({
      usuario,
      email,
      contrasena: hashedPassword,
    });

    // Verificar que el hash se guardó correctamente
    const savedUser = await this.usuarioService.findByEmailWithPassword(email);
    if (savedUser?.contrasena !== hashedPassword) {
      console.error('Hash mismatch after save:', {
        originalHash: hashedPassword,
        savedHash: savedUser?.contrasena,
      });
    }

    return {
      usuario,
      email,
    };
  }

  // async login({ email, contrasena }: LoginDto) {
  //   const usuario = await this.usuarioService.findByEmailWithPassword(email);

  //   if (!usuario) {
  //     throw new UnauthorizedException('Contrasena o Email no son incorrectos');
  //   }

  //   const contrasenaValida = await bcrypt.compare(
  //     contrasena,
  //     usuario.contrasena,
  //   );

  //   if (!contrasenaValida) {
  //     throw new UnauthorizedException('Contrasena o Email no son incorrectos');
  //   }

  //   const payload = {
  //     email: usuario.email,
  //     rol: usuario.rol,
  //     id: usuario.idUsuario,
  //   };

  //   const accessToken = await this.jwtService.signAsync(payload, {
  //     secret: process.env.JWT_ACCESS_SECRET,
  //     expiresIn: '15m',
  //   });

  //   const refreshToken = await this.jwtService.signAsync(payload, {
  //     secret: process.env.JWT_REFRESH_SECRET,
  //     expiresIn: '7d',
  //   });

  //   return { accessToken, refreshToken, email };
  // }

  async login({ email, contrasena }: LoginDto) {
    // Obtener usuario con contraseña
    const usuario = await this.usuarioService.findByEmailWithPassword(email);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar la contraseña
    try {
      const contrasenaValida = await bcrypt.compare(
        contrasena,
        usuario.contrasena,
      );
      if (!contrasenaValida) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw new UnauthorizedException(
        'Error en la verificación de credenciales',
      );
    }

    // Generar tokens
    const payload = {
      email: usuario.email,
      rol: usuario.rol,
      id: usuario.idUsuario,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

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

  async password(
    idUsuario: string,
    { email, contrasena, nuevaContrasena }: UpdatePasswordDto,
  ) {
    const nombreUsuario =
      await this.usuarioService.findByEmailWithPassword(email);

    if (!nombreUsuario) {
      throw new UnauthorizedException('Email no son incorrectos');
    }

    const contrasenaValida = await bcrypt.compare(
      contrasena,
      nombreUsuario.contrasena,
    );

    if (!contrasenaValida) {
      throw new UnauthorizedException('Contrasena no son incorrectos');
    }

    const hashedPassword = await bcrypt.hash(nuevaContrasena, this.SALT_ROUNDS);
    console.log('Hashed new password:', hashedPassword);

    await this.usuarioService.update(idUsuario, {
      email,
      contrasena: hashedPassword,
    });

    return this.usuarioService.findByEmail(email);
  }

  async profile({ email }: { email: string }) {
    return await this.usuarioService.findByEmail(email);
  }
}
