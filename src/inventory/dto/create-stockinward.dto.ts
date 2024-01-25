import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';


export class CreateStockInwardDto {
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  supplierId: number;

  @IsNotEmpty()
  @IsNumber()
  productVariantId: number;
}