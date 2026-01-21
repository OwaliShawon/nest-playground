import { InvoiceDetail } from "src/invoice_details/entities/invoice_detail.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InvoiceMaster {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    invoice_no: string;

    @Column()
    date: Date;

    @Column()
    customer_name: string;

    @OneToMany(() => InvoiceDetail, detail => detail.invoiceMaster, {
        cascade: true
    })
    invoiceDetails: InvoiceDetail[];
}
