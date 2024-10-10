import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { TipoGeneral } from 'src/tipo-general/entities/tipo-general.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(TipoGeneral)
    private readonly tipoGeneralRepository: Repository<TipoGeneral>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const tipoDocumento = await this.tipoGeneralRepository.findOne({
      where: { nombre: createClienteDto.tipoDocumento },
    });

    if (!tipoDocumento) {
      throw new NotFoundException('Tipo de documento no encontrado.');
    }

    const tipoCliente = await this.tipoGeneralRepository.findOne({
      where: { nombre: createClienteDto.tipoCliente },
    });

    if (!tipoCliente) {
      throw new NotFoundException('Tipo de cliente no encontrado.');
    }

    const cliente = this.clienteRepository.create(createClienteDto);
    return await this.clienteRepository.save(cliente);
  }

  async update(idCliente: string, updateClienteDto: UpdateClienteDto) {
    const errores: string[] = [];

    // Verificación de tipo de documento (en caso de que se incluya en la actualización)
    if (updateClienteDto.tipoDocumento) {
      const tipoDocumento = await this.tipoGeneralRepository.findOne({
        where: { nombre: updateClienteDto.tipoDocumento, tipo: 'documento' },
      });

      if (!tipoDocumento) {
        errores.push('Tipo de documento no encontrado.');
      }
    }

    // Verificación de tipo de cliente (en caso de que se incluya en la actualización)
    if (updateClienteDto.tipoCliente) {
      const tipoCliente = await this.tipoGeneralRepository.findOne({
        where: { nombre: updateClienteDto.tipoCliente, tipo: 'cliente' },
      });

      if (!tipoCliente) {
        errores.push('Tipo de cliente no encontrado.');
      }
    }

    // Si hay errores, lanzar excepción
    if (errores.length > 0) {
      throw new BadRequestException(errores);
    }

    const cliente = await this.clienteRepository.update(
      idCliente,
      updateClienteDto,
    );

    if (cliente.affected === 0) {
      throw new NotFoundException(
        `Cliente con el ID ${idCliente} no encontrado`,
      );
    }

    return this.clienteRepository.findOne({ where: { idCliente } });
  }

  async findAll() {
    return await this.clienteRepository.find();
  }

  async findOne(idCliente: string) {
    try {
      const cliente = await this.clienteRepository.findOne({
        where: { idCliente },
      });

      if (!cliente) {
        throw new NotFoundException(
          `Cliente con el id ${idCliente} no encontrado.`,
        );
      }

      return cliente;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException('El ID proporcionado no es válido');
    }
  }

  async remove(idCliente: string) {
    const cliente = await this.clienteRepository.softDelete(idCliente);

    if (cliente.affected === 0) {
      throw new NotFoundException(
        `Cliente con el ID ${idCliente} no encontrado.`,
      );
    }

    return { message: `Cliente con el ID ${idCliente} eliminado.` };
  }
}
