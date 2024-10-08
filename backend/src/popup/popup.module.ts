import { Module } from '@nestjs/common';
import { PopUpService } from './popup.service';
import { PopUpController } from './popup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PopUp } from './entities/popup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PopUp])],
  controllers: [PopUpController],
  providers: [PopUpService],
})
export class PopUpModule {}