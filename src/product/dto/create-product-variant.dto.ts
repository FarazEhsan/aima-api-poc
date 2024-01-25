import { IsNotEmpty, IsString, IsEnum, IsNumber, IsOptional, IsArray, ValidateNested, Min } from 'class-validator';
import { ProductUnit } from 'src/enums';

export class CreateProductVariantDto {


  @IsNotEmpty()
  @IsEnum(ProductUnit)
  unit: ProductUnit;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  currentStock: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  minimumStock: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

}