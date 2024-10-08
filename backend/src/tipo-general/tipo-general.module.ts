import { Module } from '@nestjs/common';
import { TipoGeneralService } from './tipo-general.service';
import { TipoGeneralController } from './tipo-general.controller';

@Module({
  controllers: [TipoGeneralController],
  providers: [TipoGeneralService],
})
export class TipoGeneralModule {}
