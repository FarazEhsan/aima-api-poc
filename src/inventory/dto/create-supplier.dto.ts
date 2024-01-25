import { IsNotEmpty, IsString, IsEmail} from 'class-validator';
import { Type } from 'class-transformer';


export class CreateSupplierDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  contactPerson: string;

  @IsNotEmpty()
  @IsString()
  contactPersonPhone: string;

}