import { Test, TestingModule } from '@nestjs/testing';
import { InventoryReportService } from './inventory-report.service';
import { EntityManager } from 'typeorm';

describe('InventoryReportService', () => {
  let service: InventoryReportService;
  let manager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryReportService,
        {
          provide: EntityManager,
          useValue: {
            query: jest.fn().mockResolvedValue([
              {
                productname: 'Detergent',
                unit: 'KG',
                averagesalesperday: 30,
                restockingamount: -20,
                currentstock: 170,
                minimumstock: 20,
              },
              {
                productname: 'Detergent',
                unit: 'PC',
                averagesalesperday: 15,
                restockingamount: 20,
                currentstock: 70,
                minimumstock: 10,
              },
              {
                productname: 'Soap',
                unit: 'PC',
                averagesalesperday: 30,
                restockingamount: -120,
                currentstock: 270,
                minimumstock: 30,
              },
            ]),
          },
        },
      ],
    }).compile();

    service = module.get<InventoryReportService>(InventoryReportService);
    manager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRestockingReport', () => {
    it('should return restocking report', async () => {
      expect(await service.getRestockingReport()).toEqual([
        {
          productname: 'Detergent',
          unit: 'KG',
          averagesalesperday: 30,
          restockingamount: -20,
          currentstock: 170,
          minimumstock: 20,
        },
        {
          productname: 'Detergent',
          unit: 'PC',
          averagesalesperday: 15,
          restockingamount: 20,
          currentstock: 70,
          minimumstock: 10,
        },
        {
          productname: 'Soap',
          unit: 'PC',
          averagesalesperday: 30,
          restockingamount: -120,
          currentstock: 270,
          minimumstock: 30,
        },
      ]);
      expect(manager.query).toHaveBeenCalledWith('SELECT * FROM get_restocking_amount()');
    });
  });
});