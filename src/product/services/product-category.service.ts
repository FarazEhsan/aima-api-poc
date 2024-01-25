import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../entities/productcategory.entity';
import { Repository } from 'typeorm';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';

@Injectable()
export class ProductCategoryService {

    @InjectRepository(ProductCategory)
    productCategoryRepository:Repository<ProductCategory>

    create(@Body() createProductCategoryDto:CreateProductCategoryDto){
        return this.productCategoryRepository.save(createProductCategoryDto)
    }

    findAll(){
        return this.productCategoryRepository.find()
    }

    findOne(id:number){
        return this.productCategoryRepository.findOne({where:{id:id}})
    }

    update(id:number,updateProductCategoryDto:CreateProductCategoryDto){
        return this.productCategoryRepository.update(id,updateProductCategoryDto)
    }

    remove(id:number){
        return this.productCategoryRepository.delete(id)
    }

}
