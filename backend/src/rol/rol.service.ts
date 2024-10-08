import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolGeneralRepository: Repository<Rol>,
  ) {}

  async create(createRolDto: CreateRolDto) {
    const rol = this.rolGeneralRepository.create(createRolDto);
    return await this.rolGeneralRepository.save(rol);
  }

  async findAll() {
    return await this.rolGeneralRepository.find();
  }

  async findOne(idRol: string) {
    try {
      const rol = await this.rolGeneralRepository.findOne({
        where: { idRol },
      });

      if (!rol) {
        throw new NotFoundException(`Rol con el ID ${idRol} no encontrado.`);
      }

      return rol;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException('El ID proporcionado no es valido');
    }
  }

  async update(idRol: string, updateRolDto: UpdateRolDto) {
    const rol = this.rolGeneralRepository.update(idRol, updateRolDto);

    if ((await rol).affected === 0) {
      throw new NotFoundException(`Rol con el ID ${idRol} no encontrado`);
    }

    return this.rolGeneralRepository.findOne({ where: { idRol } });
  }

  async remove(idRol: string) {
    const rol = await this.rolGeneralRepository.softDelete(idRol);

    if ((await rol).affected === 0) {
      throw new NotFoundException(`Rol con el ID ${idRol} no encontrada`);
    }

    return { message: `Tipo General con el ID ${idRol} eliminada` };
  }
}
