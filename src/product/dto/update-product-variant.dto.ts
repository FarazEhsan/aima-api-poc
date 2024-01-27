
import { ProductUnit } from '../../enums';

export class UpdateProductVariantDto {
  
  unit?: ProductUnit;
  currentStock?: number;
  minimumStock?: number;
  productId?: number;

}