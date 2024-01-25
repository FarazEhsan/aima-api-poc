import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { StockInwardService } from '../services/stock-inward.service';
import { CreateStockInwardDto } from '../dto/create-stockinward.dto';

@Controller('stock-inward')
export class StockInwardController {
    constructor(private readonly stockInwardService:StockInwardService){}

    @Post()
    create(@Body() createStockInwardDto:CreateStockInwardDto){
        return this.stockInwardService.create(createStockInwardDto)
    }
    @Get()
    findAll(){
        return this.stockInwardService.findAll()
    }
    @Get(':id')
    findOne(id:number){
        return this.stockInwardService.findOne(id)
    }
    @Patch(':id')
    update(id:number,updateStockInwardDto:CreateStockInwardDto){
        return this.stockInwardService.update(id,updateStockInwardDto)
    }
    @Delete(':id')
    remove(id:number){
        return this.stockInwardService.remove(id)
    }
}
