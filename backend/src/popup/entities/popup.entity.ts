import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class PopUp {
    @PrimaryGeneratedColumn('uuid')
    idPopUp: string;
  
    @Column({ type: 'boolean' })
    estadoPopUp: boolean;
  
    @Column({ type: 'text' })
    imagenPopUp: string; 

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
  }
  

