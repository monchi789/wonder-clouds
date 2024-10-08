import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryColumn('uuid')
  idUsuario: string;

  @Column({ type: 'text', unique: true })
  nombreUsuario: string;

  @Column({ type: 'text', unique: true })
  contrasena: string;

  @Column({ type: 'text', unique: true })
  email: string;
}
