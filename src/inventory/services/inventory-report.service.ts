import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class InventoryReportService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  async getRestockingReport() {
    const restockingReport = await this.entityManager.query(
      'SELECT * FROM get_restocking_amount()',
    );
    return restockingReport;
  }
}
