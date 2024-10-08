import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Entity()
export class Trabajo {
  @PrimaryGeneratedColumn('uuid')
  idTrabajo: string;

  @Column({ type: 'text' })
  nombreTrabajo: string;

  @Column({ type: 'text' })
  portadaTrabajo: string;

  @Column({ type: 'text' })
  descripcionTrabajo: string;

  @Column({ type: 'boolean' })
  visibilidadTrabajo: boolean;

  @Column({ type: Date })
  fechaTrabajo: Date;

  @ManyToOne(() => Cliente)
  idCliente: Cliente;

  @Column({ type: 'text' })
  tipoTrabajo: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
