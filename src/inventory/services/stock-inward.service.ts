import { Injectable } from '@nestjs/common';
import { StockInward } from '../entities/stockinward.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStockInwardDto } from '../dto/create-stockinward.dto';

@Injectable()
export class StockInwardService {
  @InjectRepository(StockInward)
  private readonly stockInwardRepository: Repository<StockInward>;

  create(createStockInwardDTO: CreateStockInwardDto) {
    return this.stockInwardRepository.save(createStockInwardDTO);
  }
  findAll() {
    return this.stockInwardRepository.find();
  }
  findOne(id: number) {
    return this.stockInwardRepository.findOne({ where: { id: id } });
  }
  update(id: number, updateStockInwardDto: CreateStockInwardDto) {
    return this.stockInwardRepository.update(id, updateStockInwardDto);
  }
  remove(id: number) {
    return this.stockInwardRepository.delete(id);
  }
}
