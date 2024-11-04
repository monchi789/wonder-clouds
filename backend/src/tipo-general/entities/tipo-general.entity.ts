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
