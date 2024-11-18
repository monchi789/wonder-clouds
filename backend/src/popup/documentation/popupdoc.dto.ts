import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class PopUpDocumentationDto {
  @ApiProperty({
    description: 'Estado del Pop-Up (activo o inactivo)',
    type: 'boolean',
    example: true,
  })
  @IsBoolean()
  estadoPopUp: boolean;

  @ApiProperty({
    description: 'Ruta de la imagen del Pop-Up',
    type: 'string',
    format: 'binary',
    example: '/uploads/popups/popup1.jpg',
  })
  @IsString()
  imagenPopUp: string;
}
