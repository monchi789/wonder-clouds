import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import {
  ApiTags,
  ApiConsumes,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';
import { FiltroClienteDto } from './dto/cliente-filtro.dto';

@ApiTags('Cliente')
@Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES_TRABAJOS)
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiConsumes('application/json')
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  findAll(@Query() filtros: FiltroClienteDto) {
    return this.clienteService.findAll(filtros);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por su ID' })
  @ApiResponse({ status: 200, description: 'Cliente obtenido exitosamente.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  @ApiParam({ name: 'id', description: 'ID del cliente' })
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente' })
  @ApiConsumes('application/json') // Indica que se utilizará application/json
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string' },
        apellidoPaterno: { type: 'string' },
        apellidoMaterno: { type: 'string' },
        nroDocumento: { type: 'string' },
        rubro: { type: 'string' },
        celular: { type: 'string' },
        correo: { type: 'string' },
        direccion: { type: 'string' },
        tipoDocumento: { type: 'string' },
        tipoCliente: { type: 'string' },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente por su ID' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  remove(@Param('id') id: string) {
    return this.clienteService.remove(id);
  }
}
