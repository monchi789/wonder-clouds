import { Module } from '@nestjs/common';
import { TrabajoService } from './trabajo.service';
import { TrabajoController } from './trabajo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trabajo } from './entities/trabajo.entity';
import { ClienteModule } from 'src/cliente/cliente.module';
import { ImageModule } from '../imagenes/image.module';
import { ServicioModule } from '../servicio/servicio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trabajo]),
    ClienteModule,
    ImageModule,
    ServicioModule,
  ],
  controllers: [TrabajoController],
  providers: [TrabajoService],
  exports: [TypeOrmModule],
})
export class TrabajoModule {}
