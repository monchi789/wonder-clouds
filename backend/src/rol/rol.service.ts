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
import { Permiso } from 'src/permiso/entities/permiso.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,
  ) {}

  async create(createRolDto: CreateRolDto): Promise<Rol> {
    const { nombreRol, permisos } = createRolDto;

    const nuevoRol = this.rolRepository.create({ nombreRol });

    if (permisos && permisos.length > 0) {
      const permisosAsociados = await Promise.all(
        permisos.map(async (permisoDto) => {
          if ('idPermiso' in permisoDto) {
            return this.permisoRepository.findOne({
              where: { idPermiso: permisoDto.idPermiso },
            });
          } else {
            const nuevoPermiso = this.permisoRepository.create(permisoDto);
            return this.permisoRepository.save(nuevoPermiso);
          }
        }),
      );

      nuevoRol.permisos = permisosAsociados.filter(
        (permiso) => permiso !== null,
      );
    }

    return await this.rolRepository.save(nuevoRol);
  }

  async findAll() {
    return await this.rolRepository.find();
  }

  async findOne(idRol: string) {
    try {
      const rol = await this.rolRepository.findOne({
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
    // Buscar el rol existente
    const rol = await this.rolRepository.findOne({
      where: { idRol },
      relations: ['permisos'],
    });

    if (!rol) {
      throw new NotFoundException(`Rol con el ID ${idRol} no encontrado`);
    }

    // Extraer las propiedades del DTO
    const { permisos, ...restoDatos } = updateRolDto;

    // Actualizar las propiedades del rol que no son relaciones
    this.rolRepository.merge(rol, restoDatos);

    // Si hay permisos a actualizar, buscar y asignar las entidades correspondientes
    if (permisos && Array.isArray(permisos)) {
      const permisosEntidades =
        await this.permisoRepository.findByIds(permisos);
      rol.permisos = permisosEntidades;
    }

    // Guardar el rol actualizado en la base de datos
    await this.rolRepository.save(rol);

    // Retornar el rol actualizado con sus relaciones
    return this.rolRepository.findOne({
      where: { idRol },
      relations: ['permisos'],
    });
  }

  async remove(idRol: string) {
    const rol = await this.rolRepository.softDelete(idRol);

    if ((await rol).affected === 0) {
      throw new NotFoundException(`Rol con el ID ${idRol} no encontrada`);
    }

    return { message: `Tipo General con el ID ${idRol} eliminada` };
  }
}
