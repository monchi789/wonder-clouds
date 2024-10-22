import { Rol } from '../../common/enums/rol.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryColumn('uuid')
  idUsuario: string;

  @Column({ type: 'text', unique: true })
  nombreUsuario: string;

  @Column({ type: 'text', unique: true })
  contrasena: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'enum', default: Rol.USUARIO, enum: Rol })
  rol: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
