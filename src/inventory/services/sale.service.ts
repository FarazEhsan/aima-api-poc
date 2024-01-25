import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sales } from '../entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleService {
    @InjectRepository(Sales)
    private readonly saleRepository:Repository<Sales>

    create(createSaleDTO:Sales){
        return this.saleRepository.save(createSaleDTO)
    }
    findAll(){
        return this.saleRepository.find()
    }
    findOne(id:number){
        return this.saleRepository.findOne({where:{id:id}})
    }
    update(id:number,updateSaleDto:Sales){
        return this.saleRepository.update(id,updateSaleDto)
    }
    remove(id:number){
        return this.saleRepository.delete(id)
    }
}
