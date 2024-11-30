import { Module } from '@nestjs/common';
import { GaleriaService } from './galeria.service';
import { GaleriaController } from './galeria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Galeria } from './entities/galeria.entity';
import { ImageModule } from '../imagenes/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Galeria]), ImageModule],
  controllers: [GaleriaController],
  providers: [GaleriaService],
})
export class GaleriaModule {}
