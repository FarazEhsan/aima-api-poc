import { IsNotEmpty, IsString, MaxLength, IsOptional, IsArray, ValidateNested, MinLength } from 'class-validator';

export class CreateProductCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString()
  @MaxLength(255)
  description: string;

}