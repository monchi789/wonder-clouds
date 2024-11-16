import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { TipoGeneral } from 'src/tipo-general/entities/tipo-general.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, TipoGeneral])],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [TypeOrmModule],
})
export class ClienteModule {}
