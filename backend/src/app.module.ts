import { Module } from '@nestjs/common';
import { PublicacionModule } from './publicacion/publicacion.module';
import { SliderModule } from './slider/slider.module';
import { PublicacionModule } from './publicacion/publicacion.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioModule } from './servicio/servicio.module';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService]


  imports: [
    PublicacionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],

    SliderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    PopUpModule,
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
      autoLoadEntities: true,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      logging: true,
    }),

  ],
  controllers: [],
  providers: [],

    ServicioModule,
  ],
})
export class AppModule {}
