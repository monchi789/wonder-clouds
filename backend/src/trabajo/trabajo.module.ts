import { Module } from '@nestjs/common';
import { TrabajoService } from './trabajo.service';
import { TrabajoController } from './trabajo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trabajo } from './entities/trabajo.entity';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trabajo]), ClienteModule],
  controllers: [TrabajoController],
  providers: [TrabajoService],
  exports: [TypeOrmModule],
})
export class TrabajoModule {}
