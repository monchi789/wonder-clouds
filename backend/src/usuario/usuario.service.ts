import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create({
    usuario,
    contrasena,
    email,
    rol,
    nombre,
    apellidoPaterno,
    apellidoMaterno,
  }: CreateUsuarioDto) {
    const isHashed = contrasena.startsWith('$2b$');
    const hashedPassword = isHashed
      ? contrasena
      : await bcrypt.hash(contrasena, 10);

    const usuarioCreate = this.usuarioRepository.create({
      usuario,
      contrasena: hashedPassword,
      email,
      rol,
      apellidoPaterno,
      apellidoMaterno,
      nombre,
    });
    return await this.usuarioRepository.save(usuarioCreate);
  }

  findByEmailWithPassword(email: string) {
    return this.usuarioRepository.findOne({
      where: { email },
      select: ['idUsuario', 'usuario', 'email', 'contrasena', 'rol'],
    });
  }

  findByEmail(email: string) {
    return this.usuarioRepository.findOneBy({ email });
  }

  async findAll() {
    return await this.usuarioRepository.find({
      select: [
        'idUsuario',
        'usuario',
        'email',
        'rol',
        'nombre',
        'apellidoPaterno',
        'apellidoMaterno',
        'createAt',
        'updateAt',
      ],
    });
  }

  async findOne(idUsuario: string) {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { idUsuario },
        select: [
          'idUsuario',
          'usuario',
          'email',
          'rol',
          'nombre',
          'apellidoPaterno',
          'apellidoMaterno',
          'createAt',
          'updateAt',
        ],
      });

      if (!usuario) {
        throw new NotFoundException(
          `Usuario con el ID ${idUsuario} no encontrado`,
        );
      }

      return usuario;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('El ID proporcionado no es valido');
    }
  }

  async update(
    idUsuario: string,
    {
      usuario,
      contrasena,
      email,
      rol,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
    }: UpdateUsuarioDto,
  ) {
    const updateData: Partial<Usuario> = {};

    if (usuario) updateData.usuario = usuario;
    if (email) updateData.email = email;
    if (rol) updateData.rol = rol;
    if (nombre) updateData.nombre = nombre;
    if (apellidoPaterno) updateData.apellidoMaterno = apellidoPaterno;
    if (apellidoMaterno) updateData.apellidoMaterno = apellidoMaterno;

    if (contrasena) {
      const isHashed = contrasena.startsWith('$2b$');
      updateData.contrasena = isHashed
        ? contrasena
        : await bcrypt.hash(contrasena, 10);
    }

    const result = await this.usuarioRepository.update(idUsuario, updateData);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Usuario con el ID ${idUsuario} no encontrado`,
      );
    }

    return this.usuarioRepository.findOne({
      where: { idUsuario },
    });
  }

  async remove(idUsuario: string) {
    const usuario = await this.usuarioRepository.softDelete(idUsuario);

    if ((await usuario).affected === 0) {
      throw new NotFoundException(
        `Usuario con el ID ${idUsuario} no encontrado`,
      );
    }

    return { message: `Usuario con el ID ${idUsuario} eliminada` };
  }
}
