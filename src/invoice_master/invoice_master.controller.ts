import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoiceMasterService } from './invoice_master.service';
import { CreateInvoiceMasterDto } from './dto/create-invoice_master.dto';
import { UpdateInvoiceMasterDto } from './dto/update-invoice_master.dto';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('invoice-master')
export class InvoiceMasterController {
  constructor(private readonly invoiceMasterService: InvoiceMasterService) {}

  @Post()
  create(@Body() createInvoiceMasterDto: any) {
    return this.invoiceMasterService.create(createInvoiceMasterDto);
  }

  @Get()
  @CacheKey('custom_key')
  @CacheTTL(20)
  findAll() {
    return this.invoiceMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceMasterService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvoiceMasterDto: UpdateInvoiceMasterDto,
  ) {
    return this.invoiceMasterService.update(+id, updateInvoiceMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceMasterService.remove(+id);
  }
}
