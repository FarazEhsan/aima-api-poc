import { Injectable } from '@nestjs/common';
import { CreateInverntoryDto } from './dto/create-inverntory.dto';
import { UpdateInverntoryDto } from './dto/update-inverntory.dto';

@Injectable()
export class InverntoryService {
  create(createInverntoryDto: CreateInverntoryDto) {
    return 'This action adds a new inverntory';
  }

  findAll() {
    return `This action returns all inverntory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inverntory`;
  }

  update(id: number, updateInverntoryDto: UpdateInverntoryDto) {
    return `This action updates a #${id} inverntory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inverntory`;
  }
}
