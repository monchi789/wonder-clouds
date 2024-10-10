import { Module } from '@nestjs/common';
import { PublicacionModule } from './publicacion/publicacion.module';
import { SliderModule } from './slider/slider.module';
import { ClienteModule } from './cliente/cliente.module';
import { TrabajoModule } from './trabajo/trabajo.module';
import { DetalleTrabajoModule } from './detalle-trabajo/detalle-trabajo.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioModule } from './servicio/servicio.module';
import { TipoGeneralModule } from './tipo-general/tipo-general.module';
import { PopUpModule } from './popup/popup.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { PermisoModule } from './permiso/permiso.module';

@Module({
  imports: [
    PublicacionModule,
    SliderModule,
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
      port: parseInt(process.env.PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UsuarioModule,
    RolModule,
    PermisoModule,
  ],
})
export class AppModule {}
