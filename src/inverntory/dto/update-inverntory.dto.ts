import { PartialType } from '@nestjs/mapped-types';
import { CreateInverntoryDto } from './create-inverntory.dto';

export class UpdateInverntoryDto extends PartialType(CreateInverntoryDto) {}
