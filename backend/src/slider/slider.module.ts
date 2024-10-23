import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slider } from './entities/slider.entity';
import { ImageModule } from '../imagenes/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Slider]), ImageModule],
  controllers: [SliderController],
  providers: [SliderService],
})
export class SliderModule {}
