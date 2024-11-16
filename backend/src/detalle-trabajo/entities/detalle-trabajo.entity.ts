import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Trabajo } from 'src/trabajo/entities/trabajo.entity';

@Entity()
export class DetalleTrabajo {
  @PrimaryGeneratedColumn('uuid')
  idDetalleTrabajo: string;

  @Column({ type: 'text' })
  urlTrabajo: string;

  @Column({ type: Date })
  fechaHosting: Date;

  @Column({ type: Date })
  fechaDominio: Date;

  @OneToOne(() => Trabajo)
  @JoinColumn()
  @Index({ unique: true })
  idTrabajo: Trabajo;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
