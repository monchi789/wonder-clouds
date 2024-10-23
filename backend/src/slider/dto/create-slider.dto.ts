import { Type } from 'class-transformer';
import { IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSliderDto {
  @ApiProperty({
    description: 'Estado del slider',
    example: true,
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  estadoSlider: boolean;
}
