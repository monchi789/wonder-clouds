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
  
    @Column({ type: 'text' })
    imagen: string; 

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
  }
  