import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { SupplierService } from '../services/supplier.service';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }
  @Get(':id')
  findOne(id: number) {
    return this.supplierService.findOne(id);
  }
  @Patch(':id')
  update(id: number, updateSupplierDto: CreateSupplierDto) {
    return this.supplierService.update(id, updateSupplierDto);
  }
  @Delete(':id')
  remove(id: number) {
    return this.supplierService.remove(id);
  }
}
