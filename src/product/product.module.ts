import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductVariantController } from './controllers/product-variant.controller';
import { ProductCategoryController } from './controllers/product-category.controller';
import { ProductCategoryService } from './services/product-category.service';
import { ProductVariantService } from './services/product-variant.service';
import { ProductVariant } from './entities/productvariant.entity';
import { ProductCategory } from './entities/productcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductVariant, ProductCategory])],
  controllers: [ProductController, ProductVariantController, ProductCategoryController],
  providers: [ProductService, ProductCategoryService, ProductVariantService],
})
export class ProductModule {}
