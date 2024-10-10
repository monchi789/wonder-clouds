import { Rol } from 'src/rol/entities/rol.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Permiso {
  @PrimaryGeneratedColumn('increment')
  idPermiso: number;

  @Column({ type: 'text', unique: true })
  nombrePermiso: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToMany(() => Rol, (rol) => rol.permisos)
  roles: Rol[];
}
