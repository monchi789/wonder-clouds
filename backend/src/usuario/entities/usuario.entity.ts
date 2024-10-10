import { Rol } from 'src/rol/entities/rol.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

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

  @ManyToOne(() => Rol, (rol) => rol.idRol, {
    eager: true,
  })
  rol: Rol;
}
