import { InvoiceMaster } from 'src/invoice_master/entities/invoice_master.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class InvoiceDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  SKU: string;

  @Column()
  quantity: number;

  @Column()
  rate: number;

  @Column()
  amount: number;

  @ManyToOne(() => InvoiceMaster, (master) => master.invoiceDetails)
  @JoinColumn({ name: 'invoice_master_id' })
  invoiceMaster: InvoiceMaster;
}
