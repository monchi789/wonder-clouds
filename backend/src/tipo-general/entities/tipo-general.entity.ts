import { Tipo } from 'src/common/enums/tipo.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TipoGeneral {
  @PrimaryGeneratedColumn('uuid')
  idTipoGeneral: string;

  @Column({ type: 'varchar', length: 5, unique: true })
  codigo: string;

  @Column({ type: 'text', unique: true })
  nombre: string;

  @Column({ nullable: true, type: 'text' })
  descripcion: string;

  @Column({ type: 'enum', default: Tipo.GENERAL, enum: Tipo })
  tipo: string;

  @Column({ type: 'boolean' })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
