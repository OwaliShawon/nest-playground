import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested
} from "class-validator";
import { CreateInvoiceDetailDto } from "src/invoice_details/dto/create-invoice_detail.dto";

export class CreateInvoiceMasterDto {
  @IsString()
  @IsNotEmpty()
  invoice_no: string;

  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceDetailDto)
  invoiceDetails: CreateInvoiceDetailDto[];
}
