import { Injectable } from '@nestjs/common';
import { CreateInvoiceMasterDto } from './dto/create-invoice_master.dto';
import { UpdateInvoiceMasterDto } from './dto/update-invoice_master.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { InvoiceMaster } from './entities/invoice_master.entity';

@Injectable()
export class InvoiceMasterService {

  constructor(
    @InjectRepository(InvoiceMaster)
    private invoiceMasterRepository: Repository<InvoiceMaster>,
    private dataSource: DataSource
  ) { }

  async create(createInvoiceMasterDto: CreateInvoiceMasterDto) {
    try {
      return this.invoiceMasterRepository.save(createInvoiceMasterDto);
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.invoiceMasterRepository.find({
      relations: {
        invoiceDetails: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} invoiceMaster`;
  }

  update(id: number, updateInvoiceMasterDto: UpdateInvoiceMasterDto) {
    return `This action updates a #${id} invoiceMaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceMaster`;
  }
}
