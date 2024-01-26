import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Sales } from '../entities/sale.entity';
import { EntityManager, Repository } from 'typeorm';
import { ProductVariant } from 'src/product/entities/productvariant.entity';
import { CreateSalesDto } from '../dto/create-sale.dto';

@Injectable()
export class SaleService {
  @InjectRepository(Sales)
  private readonly saleRepository: Repository<Sales>;
  @InjectEntityManager()
  private entityManager: EntityManager;

  async create(createSaleDTO: CreateSalesDto) {
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      const productVariant = await transactionalEntityManager.findOne(
        ProductVariant,
        { where: { id: createSaleDTO.productVariantId } },
      );
      //save the sale
      const newSale = new Sales();
      newSale.productVariant = productVariant;
      newSale.quantity = createSaleDTO.quantity;
      await transactionalEntityManager.save(newSale);
      //update stock in productVariant

      productVariant.currentStock =
        productVariant.currentStock - createSaleDTO.quantity;
      await transactionalEntityManager.save(productVariant);
    });
  }
  findAll() {
    return this.saleRepository.find();
  }
  findOne(id: number) {
    return this.saleRepository.findOne({ where: { id: id } });
  }
  update(id: number, updateSaleDto: CreateSalesDto) {
    return this.saleRepository.update(id, updateSaleDto);
  }
  remove(id: number) {
    return this.saleRepository.delete(id);
  }
}
