import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { UsuarioActiveInterface } from 'src/common/interfaces/usuario-active.interface';
import { ActiveUsuario } from 'src/common/decorators/active-usuario.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(Rol.USUARIO, Rol.ADMINISTRADOR, Rol.CREADOR_CONTENIDO)
  @UseGuards(AuthGuard, RolesGuard)
  profile(@ActiveUsuario() user: UsuarioActiveInterface) {
    return this.authService.profile(user);
  }
}
