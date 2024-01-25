import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductVariantService } from '../services/product-variant.service';
import { CreateProductVariantDto } from '../dto/create-product-variant.dto';

@Controller('product-variant')
export class ProductVariantController {
    constructor(private readonly productVariantService:ProductVariantService){}

    @Post()
    create(@Body() createProductVariantDto:CreateProductVariantDto){
        return this.productVariantService.create(createProductVariantDto)
    }

    @Get()
    findAll(){
        return this.productVariantService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id:number){
        return this.productVariantService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id:number,@Body() updateProductVariantDto:CreateProductVariantDto){
        return this.productVariantService.update(id,updateProductVariantDto)
    }

    @Delete(':id')
    remove(@Param('id') id:number){
        return this.productVariantService.remove(id)
    }
}
