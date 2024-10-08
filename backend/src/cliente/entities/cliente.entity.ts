import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
