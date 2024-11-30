import { Module } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { ImageModule } from '../imagenes/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Servicio]), ImageModule],
  controllers: [ServicioController],
  providers: [ServicioService],
  exports: [TypeOrmModule],
})
export class ServicioModule {}
