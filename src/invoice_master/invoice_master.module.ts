import { Module } from '@nestjs/common';
import { InvoiceMasterService } from './invoice_master.service';
import { InvoiceMasterController } from './invoice_master.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceMaster } from './entities/invoice_master.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceMaster])],
  controllers: [InvoiceMasterController],
  providers: [InvoiceMasterService],
})
export class InvoiceMasterModule { }
