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

  @Column({ type: 'varchar', length: 3 })
  codigo: string;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'text' })
  tipo: string;

  @Column({ type: 'boolean' })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
