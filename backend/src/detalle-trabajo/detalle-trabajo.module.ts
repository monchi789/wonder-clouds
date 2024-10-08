import { Module } from '@nestjs/common';
import { DetalleTrabajoService } from './detalle-trabajo.service';
import { DetalleTrabajoController } from './detalle-trabajo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleTrabajo } from './entities/detalle-trabajo.entity';
import { TrabajoModule } from 'src/trabajo/trabajo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleTrabajo]),
    TrabajoModule,
  ],
  controllers: [DetalleTrabajoController],
  providers: [DetalleTrabajoService],
})
export class DetalleTrabajoModule {}
