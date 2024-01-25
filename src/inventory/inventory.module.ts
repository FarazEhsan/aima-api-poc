import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { SupplierService } from './services/supplier.service';
import { StockInwardService } from './services/stock-inward.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from './entities/sale.entity';
import { Supplier } from './entities/supplier.entity';
import { StockInward } from './entities/stockinward.entity';
import { SaleService } from './services/sale.service';
import { SupplierController } from './controllers/supplier.controller';
import { StockInwardController } from './controllers/stock-inward.controller';
import { SaleController } from './controllers/sale.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Sales, Supplier, StockInward])],
  controllers: [InventoryController, SupplierController, StockInwardController, SaleController],
  providers: [InventoryService, SupplierService, StockInwardService, SaleService],
})
export class InventoryModule {}
