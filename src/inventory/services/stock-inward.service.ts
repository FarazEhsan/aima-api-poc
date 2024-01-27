import { Injectable } from '@nestjs/common';
import { StockInward } from '../entities/stockinward.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CreateStockInwardDto } from '../dto/create-stockinward.dto';
import { ProductVariant } from '../../product/entities/productvariant.entity';
import { ProductVariantService } from '../../product/services/product-variant.service';
import { Supplier } from '../entities/supplier.entity';

@Injectable()
export class StockInwardService {
  @InjectRepository(StockInward)
  private readonly stockInwardRepository: Repository<StockInward>;
  private readonly productVariantService: ProductVariantService;
  @InjectEntityManager()
  private entityManager: EntityManager;

  async create(createStockInwardDTO: CreateStockInwardDto) {
    //using transaction to make sure that all the queries are executed

    await this.entityManager.transaction(async (transactionalEntityManager) => {
      //save stock inward
      const stockInward = new StockInward();
      const productVariant = await transactionalEntityManager.findOne(
        ProductVariant,
        { where: { id: createStockInwardDTO.productVariantId } },
      );
      const supplier = await transactionalEntityManager.findOne(Supplier, {
        where: { id: createStockInwardDTO.supplierId },
      });
      stockInward.productVariant = productVariant;
      stockInward.stock = createStockInwardDTO.stock;
      stockInward.supplier = supplier;
      await transactionalEntityManager.save(stockInward);

      //update stock in productVariant
      productVariant.currentStock =
        productVariant.currentStock + createStockInwardDTO.stock;
      await transactionalEntityManager.save(productVariant);
    });
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
