import { IsNotEmpty, MinLength } from "class-validator"


export class CreateProductDto {
  
    @IsNotEmpty()
    @MinLength(3)
    productName:string
    @IsNotEmpty()
    @MinLength(50)
    productDescription:string
}
