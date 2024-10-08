import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
  import { Trabajo } from 'src/trabajo/entities/trabajo.entity';
  
  @Entity()
  export class DetalleTrabajo {
    @PrimaryGeneratedColumn('uuid')
    idDetalleTrabajo: string;
  
    @Column({ type: 'text' })
    urlTrabajo: string;
  
    @Column({ type: Date  })
    fechaHosting: Date; 

    @Column({ type: Date  })
    fechaDominio: Date; 

    @ManyToOne(() => Trabajo)
    idTrabajo: Trabajo;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
  }
  