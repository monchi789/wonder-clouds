import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { CreateTrabajoDto } from '../../trabajo/dto/create-trabajo.dto';

export class DetalleTrabajoDocumentationDto {
  @ApiProperty({
    description: 'URL del trabajo',
    type: 'string',
    example: 'https://ejemplo.com/trabajo/123',
  })
  @IsString()
  @IsNotEmpty()
  urlTrabajo: string;

  @ApiProperty({
    description: 'Fecha de hosting del trabajo',
    type: 'string',
    format: 'date',
    example: '2023-12-01',
  })
  @IsDate()
  @IsNotEmpty()
  fechaHosting: Date;

  @ApiProperty({
    description: 'Fecha de dominio del trabajo',
    type: 'string',
    format: 'date',
    example: '2024-01-01',
  })
  @IsDate()
  @IsNotEmpty()
  fechaDominio: Date;

  @ApiProperty({
    description: 'Trabajo asociado al detalle',
    type: CreateTrabajoDto,
  })
  @IsOptional()
  idTrabajo: CreateTrabajoDto;
}
