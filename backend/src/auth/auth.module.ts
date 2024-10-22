import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constanst';

@Module({
  imports: [UsuarioModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '1d'}
  })] ,
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
