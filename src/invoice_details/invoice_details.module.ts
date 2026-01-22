import { Module } from '@nestjs/common';
import { InvoiceDetailsService } from './invoice_details.service';
import { InvoiceDetailsController } from './invoice_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceDetail } from './entities/invoice_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceDetail])],
  controllers: [InvoiceDetailsController],
  providers: [InvoiceDetailsService],
})
export class InvoiceDetailsModule {}
