import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Servicio {
  @PrimaryGeneratedColumn('uuid')
  idServicio: string;

  @Column({ type: 'text' })
  nombreServicio: string;

  @Column({ type: 'text' })
  logoServicio: string;

  @Column({ type: 'float' })
  precioServicio: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
