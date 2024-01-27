import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariant } from '../entities/productvariant.entity';
import { Repository } from 'typeorm';
import { CreateProductVariantDto } from '../dto/create-product-variant.dto';
import { UpdateProductVariantDto } from '../dto/update-product-variant.dto';

@Injectable()
export class ProductVariantService {
    @InjectRepository(ProductVariant)
    private readonly productVariantRepository:Repository<ProductVariant>

    create(createProductVariantDto:CreateProductVariantDto){
        return this.productVariantRepository.save(createProductVariantDto)
    }
    findAll(){
        return this.productVariantRepository.find()
    }
    findOne(id:number){
        return this.productVariantRepository.findOne({where:{id:id}})
    }
    update(id:number,updateProductVariantDto:UpdateProductVariantDto){
        return this.productVariantRepository.update(id,updateProductVariantDto)
    }
    remove(id:number){
        return this.productVariantRepository.delete(id)
    }


}
