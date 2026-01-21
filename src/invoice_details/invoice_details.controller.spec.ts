import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceDetailsController } from './invoice_details.controller';
import { InvoiceDetailsService } from './invoice_details.service';

describe('InvoiceDetailsController', () => {
  let controller: InvoiceDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceDetailsController],
      providers: [InvoiceDetailsService],
    }).compile();

    controller = module.get<InvoiceDetailsController>(InvoiceDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
