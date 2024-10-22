import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Slider {
  @PrimaryGeneratedColumn('uuid')
  idSlider: string;

  @Column({ type: 'boolean' })
  estadoSlider: boolean;

  // Cambiamos a un array de texto para soportar múltiples imágenes
  @Column('text', { array: true })
  imagen: string[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
