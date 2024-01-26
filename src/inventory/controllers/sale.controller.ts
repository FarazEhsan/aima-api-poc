import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateSalesDto } from '../dto/create-sale.dto';
import { ApiTags } from '@nestjs/swagger';
import { SaleService } from '../services/sale.service';

@ApiTags('Sale')
@Controller('sale')
export class SaleController {
  constructor(private readonly salesService:SaleService){}

  @Post()
  create(@Body() createSaleDto: CreateSalesDto) {
    return this.salesService.create(createSaleDto);
  }
  @Get()
  findAll() {
    return this.salesService.findAll();
  }
  @Get(':id')
  findOne(id: number) {
    return this.salesService.findOne( id);
  }
  @Patch(':id')
  update(id: number, @Body() updateSaleDto: CreateSalesDto) {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  remove(id: number) {
    return this.salesService.remove(id);
  }
}
