import { Module } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { PublicacionController } from './publicacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { TipoGeneral } from 'src/tipo-general/entities/tipo-general.entity';
import { ImageModule } from '../imagenes/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Publicacion, TipoGeneral]),ImageModule],
  controllers: [PublicacionController],
  providers: [PublicacionService],
})
export class PublicacionModule {}
