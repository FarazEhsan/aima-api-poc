import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductVariantService } from '../services/product-variant.service';
import { CreateProductVariantDto } from '../dto/create-product-variant.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProductVariantDto } from '../dto/update-product-variant.dto';

@ApiBearerAuth()
@ApiTags('Product Variant')
@Controller('product-variant')
@UseGuards(AuthGuard('jwt'))
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
    update(@Param('id') id:number,@Body() updateProductVariantDto:UpdateProductVariantDto){
        return this.productVariantService.update(id,updateProductVariantDto)
    }

    @Delete(':id')
    remove(@Param('id') id:number){
        return this.productVariantService.remove(id)
    }
}
