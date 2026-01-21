import { Injectable } from '@nestjs/common';
import { CreateInvoiceDetailDto } from './dto/create-invoice_detail.dto';
import { UpdateInvoiceDetailDto } from './dto/update-invoice_detail.dto';
import { InvoiceDetail } from './entities/invoice_detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class InvoiceDetailsService {
  constructor(
    @InjectRepository(InvoiceDetail)
    private invoiceDetailRepository: Repository<InvoiceDetail>,
    private dataSource: DataSource
  ) { }

  async create(createInvoiceDetailDto: CreateInvoiceDetailDto) {
    try {
      return this.invoiceDetailRepository.save(createInvoiceDetailDto);
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.invoiceDetailRepository.find({
      relations: {
        invoiceMaster: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} invoiceDetail`;
  }

  update(id: number, updateInvoiceDetailDto: UpdateInvoiceDetailDto) {
    return `This action updates a #${id} invoiceDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceDetail`;
  }
}
