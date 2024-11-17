import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';
import { CreateClienteDto } from '../../cliente/dto/create-cliente.dto';
import { CreateServicioDto } from '../../servicio/dto/create-servicio.dto';

export class TrabajoDocumentationDto {
  @ApiProperty({
    description: 'Nombre del trabajo',
    type: 'string',
    example: 'Proyecto de Rediseño Web',
  })
  @IsString()
  @IsNotEmpty()
  nombreTrabajo: string;

  @ApiProperty({
    description: 'Portada del trabajo',
    type: 'string',
    example: '/uploads/trabajos/portada1.jpg',
  })
  @IsString()
  @IsNotEmpty()
  portadaTrabajo: string;

  @ApiProperty({
    description: 'Descripción detallada del trabajo',
    type: 'string',
    example: 'Este proyecto incluyó un rediseño completo de la página web.',
  })
  @IsString()
  @IsNotEmpty()
  descripcionTrabajo: string;

  @ApiProperty({
    description: 'Estado de visibilidad del trabajo',
    type: 'boolean',
    example: true,
  })
  @IsBoolean()
  visibilidadTrabajo: boolean;

  @ApiProperty({
    description: 'Fecha del trabajo',
    type: 'string',
    format: 'date',
    example: '2023-12-01',
  })
  @IsDate()
  @IsNotEmpty()
  fechaTrabajo: Date;

  @ApiProperty({
    description: 'Cliente asociado al trabajo',
    type: CreateClienteDto,
  })
  @IsOptional()
  idCliente: CreateClienteDto;

  @ApiProperty({
    description: 'Servicio asociado al trabajo',
    type: CreateServicioDto,
  })
  @IsOptional()
  idServicio: CreateServicioDto;
}
