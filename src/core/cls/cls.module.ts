import { Module } from '@nestjs/common';
import { ClsModule as NestjsClsModule } from 'nestjs-cls';
import { ContextService } from './cls.service';
import { ContextController } from './cls.controller';

@Module({
  imports: [
    NestjsClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
  ],
  providers: [ContextService],
  controllers: [ContextController],
  exports: [ContextService],
})
export class ClsModule {}
