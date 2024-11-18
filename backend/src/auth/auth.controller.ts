import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorators';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { UsuarioActiveInterface } from 'src/common/interfaces/usuario-active.interface';
import { ActiveUsuario } from 'src/common/decorators/active-usuario.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { LoginDocumentationDto } from './documentation/login-doc.dto';
import { RegisterDocumentationDto } from './documentation/register-doc.dto';
import { UpdatePasswordDocumentationDto } from './documentation/update-password-doc.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para registrar',
    type: RegisterDocumentationDto,
  })
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para login',
    type: LoginDocumentationDto,
  })
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    try {
      return this.authService.login(loginDto);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }
      throw error;
    }
  }

  @Patch('password/:id')
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para cambiar contraseña',
    type: UpdatePasswordDocumentationDto,
  })
  @Auth(
    Rol.ADMIN,
    Rol.GESTOR_CLIENTES_TRABAJOS,
    Rol.CREADOR_CONTENIDO,
    Rol.USUARIO,
  )
  password(
    @Param('id') id: string,
    @Body()
    passwordDto: UpdatePasswordDto,
  ) {
    return this.authService.password(id, passwordDto);
  }

  @Post('refresh')
  refresh(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token no provisto');
    }

    return this.authService.refreshToken(refreshToken);
  }

  @Get('profile')
  @Auth(
    Rol.ADMIN,
    Rol.GESTOR_CLIENTES_TRABAJOS,
    Rol.CREADOR_CONTENIDO,
    Rol.USUARIO,
  )
  @UseGuards(AuthGuard, RolesGuard)
  profile(@ActiveUsuario() user: UsuarioActiveInterface) {
    return this.authService.profile(user);
  }
}
