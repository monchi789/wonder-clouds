import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Publicacion {
  @PrimaryGeneratedColumn('uuid')
  idPublicacion: string;

  @Column({ type: 'text' })
  titulo: string;

  @Column({ type: 'text' })
  autor: string;

  @Column({ type: 'text' })
  contenido: string;

  @Column({ nullable: true })
  portada: string;

  @Column({ type: Date, default: () => 'CURRENT_DATE' })
  fechaPublicacion: Date;

  @Column({ type: 'text' })
  categoriaPublicacion: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
