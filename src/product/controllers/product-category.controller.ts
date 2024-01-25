import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryService } from '../services/product-category.service';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';

@Controller('product-category')
export class ProductCategoryController {
    constructor(private readonly productCategoryService:ProductCategoryService){}

    @Post()
    create(@Body() createProductCategoryDto:CreateProductCategoryDto){
        return this.productCategoryService.create(createProductCategoryDto)
    }

    @Get()
    findAll(){
        return this.productCategoryService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id:number){
        return this.productCategoryService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id:number,@Body() updateProductCategoryDto:CreateProductCategoryDto){
        return this.productCategoryService.update(id,updateProductCategoryDto)
    }

    @Delete(':id')
    remove(@Param('id') id:number){
        return this.productCategoryService.remove(id)
    }
}
