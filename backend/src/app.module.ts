import { Module } from '@nestjs/common';
import { PublicacionModule } from './publicacion/publicacion.module';
import { GaleriaModule } from './galeria/galeria.module';
import { ClienteModule } from './cliente/cliente.module';
import { TrabajoModule } from './trabajo/trabajo.module';
import { DetalleTrabajoModule } from './detalle-trabajo/detalle-trabajo.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioModule } from './servicio/servicio.module';
import { TipoGeneralModule } from './tipo-general/tipo-general.module';
import { PopUpModule } from './popup/popup.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PublicacionModule,
    GaleriaModule,
    PopUpModule,
    ServicioModule,
    TipoGeneralModule,
    ClienteModule,
    TrabajoModule,
    DetalleTrabajoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UsuarioModule,
    AuthModule,
  ],
})
export class AppModule {}
