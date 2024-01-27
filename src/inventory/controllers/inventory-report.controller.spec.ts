import { Test, TestingModule } from '@nestjs/testing';
import { InventoryReportController } from './inventory-report.controller';
import { InventoryReportService } from '../services/inventory-report.service';

describe('InventoryReportController', () => {
  let controller: InventoryReportController;
  let service: InventoryReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryReportController],
      providers: [
        {
          provide: InventoryReportService,
          useValue: {
            getRestockingReport: jest.fn().mockResolvedValue([
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

    controller = module.get<InventoryReportController>(InventoryReportController);
    service = module.get<InventoryReportService>(InventoryReportService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRestockingReport', () => {
    it('should return restocking report', async () => {
      expect(await controller.getRestockingReport()).toEqual([
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
      expect(service.getRestockingReport).toHaveBeenCalled();
    });
  });
});