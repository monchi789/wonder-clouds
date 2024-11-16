import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { ImageModule } from '../imagenes/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), ImageModule],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
