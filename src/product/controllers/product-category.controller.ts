import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductCategoryService } from '../services/product-category.service';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Product Category')
@Controller('product-category')
@UseGuards(AuthGuard('jwt'))
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
