import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateSalesDto {
  @IsNotEmpty()
  @IsNumber()
  productVariantId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}