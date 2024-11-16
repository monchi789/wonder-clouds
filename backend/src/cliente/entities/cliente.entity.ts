import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Trabajo } from 'src/trabajo/entities/trabajo.entity'; // Importa la entidad Trabajo

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  idCliente: string;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'text' })
  apellidoPaterno: string;

  @Column({ type: 'text' })
  apellidoMaterno: string;

  @Column({ type: 'text' })
  nroDocumento: string;

  @Column({ type: 'text' })
  rubro: string;

  @Column({ type: 'text' })
  celular: string;

  @Column({ type: 'text' })
  correo: string;

  @Column({ type: 'text' })
  direccion: string;

  @Column({ type: 'text' })
  tipoDocumento: string;

  @Column({ type: 'text' })
  tipoCliente: string;

  @OneToMany(() => Trabajo, (trabajo) => trabajo.idCliente, { cascade: true }) // Relación uno a muchos
  trabajos: Trabajo[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
