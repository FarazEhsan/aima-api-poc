import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sales } from '../entities/sale.entity';
import { Repository } from 'typeorm';
import { CreateSalesDto } from '../dto/create-sale.dto';

@Controller('sale')
export class SaleController {
  @InjectRepository(Sales)
  private readonly saleRepository: Repository<Sales>;

  @Post()
  create(@Body() createSaleDto: CreateSalesDto) {
    return this.saleRepository.save(createSaleDto);
  }
  @Get()
  findAll() {
    return this.saleRepository.find();
  }
  @Get(':id')
  findOne(id: number) {
    return this.saleRepository.findOne({ where: { id: id } });
  }
  @Patch(':id')
  update(id: number, @Body() updateSaleDto: CreateSalesDto) {
    return this.saleRepository.update(id, updateSaleDto);
  }

  @Delete(':id')
  remove(id: number) {
    return this.saleRepository.delete(id);
  }
}
