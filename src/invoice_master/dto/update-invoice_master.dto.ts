import { PartialType } from '@nestjs/swagger';
import { CreateInvoiceMasterDto } from './create-invoice_master.dto';

export class UpdateInvoiceMasterDto extends PartialType(CreateInvoiceMasterDto) {}
