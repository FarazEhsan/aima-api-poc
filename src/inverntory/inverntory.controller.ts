import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InverntoryService } from './inverntory.service';
import { CreateInverntoryDto } from './dto/create-inverntory.dto';
import { UpdateInverntoryDto } from './dto/update-inverntory.dto';

@Controller('inverntory')
export class InverntoryController {
  constructor(private readonly inverntoryService: InverntoryService) {}

  @Post()
  create(@Body() createInverntoryDto: CreateInverntoryDto) {
    return this.inverntoryService.create(createInverntoryDto);
  }

  @Get()
  findAll() {
    return this.inverntoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inverntoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInverntoryDto: UpdateInverntoryDto) {
    return this.inverntoryService.update(+id, updateInverntoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inverntoryService.remove(+id);
  }
}
