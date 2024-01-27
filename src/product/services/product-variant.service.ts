import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariant } from '../entities/productvariant.entity';
import { Repository } from 'typeorm';
import { CreateProductVariantDto } from '../dto/create-product-variant.dto';
import { UpdateProductVariantDto } from '../dto/update-product-variant.dto';
import { ProductService } from '../product.service';

@Injectable()
export class ProductVariantService {
    constructor(private readonly productService:ProductService){}
    @InjectRepository(ProductVariant)
    private readonly productVariantRepository:Repository<ProductVariant>
    

    async create(createProductVariantDto:CreateProductVariantDto){
        const product = await this.productService.findOne(createProductVariantDto.productId)
        const newProductVariant = new ProductVariant()
        newProductVariant.product = product
        newProductVariant.unit = createProductVariantDto.unit
        newProductVariant.minimumStock = createProductVariantDto.minimumStock
        newProductVariant.currentStock=createProductVariantDto.currentStock
        return this.productVariantRepository.save(newProductVariant)
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
