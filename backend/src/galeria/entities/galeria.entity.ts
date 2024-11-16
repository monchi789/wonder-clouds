import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Galeria {
  @PrimaryGeneratedColumn('uuid')
  idGaleria: string;

  @Column({ type: 'boolean' })
  estadoGaleria: boolean;

  @Column('text', { array: true })
  imagen: string[];

  @Column({ type: 'text' })
  tituloGaleria: string;

  @Column({ type: 'text' })
  descripcion: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
