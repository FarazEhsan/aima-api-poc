import { Module } from '@nestjs/common';
import { InverntoryService } from './inverntory.service';
import { InverntoryController } from './inverntory.controller';

@Module({
  controllers: [InverntoryController],
  providers: [InverntoryService],
})
export class InverntoryModule {}
