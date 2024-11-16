import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';

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

  @Column({ type: 'date' })
  fechaTrabajo: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.trabajos, { eager: true })
  @JoinColumn({ name: 'idCliente' })
  idCliente: Cliente;

  @ManyToOne(() => Servicio, { eager: true })
  @JoinColumn({ name: 'idServicio' })
  idServicio: Servicio;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
