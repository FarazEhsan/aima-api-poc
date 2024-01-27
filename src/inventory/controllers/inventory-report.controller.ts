import { Controller, Get, UseGuards } from '@nestjs/common';
import { InventoryReportService } from '../services/inventory-report.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Inventory Reports')
@Controller('inventory-report')
@UseGuards(AuthGuard('jwt'))
export class InventoryReportController {
  constructor(
    private readonly inventoryReportService: InventoryReportService,
  ) {}

  @Get()
  async getRestockingReport() {
    const restockingReport =
      await this.inventoryReportService.getRestockingReport();
    return restockingReport;
  }
}
