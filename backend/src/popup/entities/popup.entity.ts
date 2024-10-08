import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PopUp {
  @PrimaryGeneratedColumn('uuid')
  idPopUp: string;

  @Column({ type: 'boolean' })
  estadoPopUp: boolean;

  @Column({ type: 'text' })
  imagenPopUp: string;
}
