import { Module } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { PublicacionController } from './publicacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publicacion])],
  controllers: [PublicacionController],
  providers: [PublicacionService],
})
export class PublicacionModule {}
