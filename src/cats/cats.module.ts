import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { AlsModule } from 'src/als/als.module';

@Module({
  imports: [AlsModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
