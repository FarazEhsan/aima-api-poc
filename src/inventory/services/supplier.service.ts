import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from '../entities/supplier.entity';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from '../dto/create-supplier.dto';

@Injectable()
export class SupplierService {
    @InjectRepository(Supplier)
    private readonly supplierRepository:Repository<Supplier>

    create(createSupplierDTO:CreateSupplierDto){
        return this.supplierRepository.save(createSupplierDTO)
    }
    findAll(){
        return this.supplierRepository.find()
    }   
    findOne(id:number){
        return this.supplierRepository.findOne({where:{id:id}})
    }
    update(id:number,updateSupplierDto:CreateSupplierDto){
        return this.supplierRepository.update(id,updateSupplierDto)
    }
    remove(id:number){
        return this.supplierRepository.delete(id)
    }
}
