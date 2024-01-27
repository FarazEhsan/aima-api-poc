import { IsNotEmpty, IsNumber } from 'class-validator';



export class CreateSalesDto {
  @IsNotEmpty()
  @IsNumber()
  productVariantId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}