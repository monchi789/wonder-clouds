import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  idProducto: string;

  @Column({ type: 'text' })
  nombreProducto: string;

  @Column({ type: 'text' })
  descripcionProducto: string;

  @Column({ type: 'int' })
  precioPruducto: number;

  @Column('text', { array: true })
  imagenProducto: string[];

  @Column({ type: 'text' })
  categoriaProducto: string;

  @Column({ type: 'boolean' })
  estadoActivo: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
