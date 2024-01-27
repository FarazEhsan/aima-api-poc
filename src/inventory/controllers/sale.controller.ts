import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateSalesDto } from '../dto/create-sale.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SaleService } from '../services/sale.service';
import { AuthGuard } from '@nestjs/passport';


@ApiBearerAuth()
@ApiTags('Sale')
@Controller('sale')
@UseGuards(AuthGuard('jwt'))
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
