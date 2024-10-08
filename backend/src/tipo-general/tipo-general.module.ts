import { Module } from '@nestjs/common';
import { TipoGeneralService } from './tipo-general.service';
import { TipoGeneralController } from './tipo-general.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoGeneral } from './entities/tipo-general.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoGeneral])],
  controllers: [TipoGeneralController],
  providers: [TipoGeneralService],
})
export class TipoGeneralModule {}
