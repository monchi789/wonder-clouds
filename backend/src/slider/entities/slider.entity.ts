import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Slider {
    @PrimaryGeneratedColumn('uuid')
    idSlider: string;
  
    @Column({ type: 'boolean' })
    estadoSlider: boolean;
  
    @Column({ type: 'text' })
    imagen: string; 
  }
  