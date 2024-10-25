import {
  Body,
  Controller,
  Get,
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

  @Post('refresh')
  @UseGuards()
  refresh(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token no provisto');
    }

    return this.authService.refreshToken(refreshToken);
  }

  @Get('profile')
  @Auth()
  @UseGuards(AuthGuard, RolesGuard)
  profile(@ActiveUsuario() user: UsuarioActiveInterface) {
    return this.authService.profile(user);
  }
}
