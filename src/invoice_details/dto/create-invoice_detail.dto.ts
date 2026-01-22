import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateInvoiceDetailDto {
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @IsString()
  @IsNotEmpty()
  SKU: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  rate: number;

  @IsNumber()
  @Min(0)
  amount: number;
}
