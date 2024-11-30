import { Rol } from '../../common/enums/rol.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  idUsuario: string;

  @Column({ type: 'text', unique: true })
  usuario: string;

  @Column({ type: 'text', nullable: false, select: false })
  contrasena: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'enum', default: Rol.USUARIO, enum: Rol })
  rol: string;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'text' })
  apellidoPaterno: string;

  @Column({ type: 'text' })
  apellidoMaterno: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
