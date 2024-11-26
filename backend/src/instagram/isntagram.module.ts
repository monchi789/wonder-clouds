import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './isntagram.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [InstagramController],
  providers: [InstagramService],
})
export class InstagramModule {}
