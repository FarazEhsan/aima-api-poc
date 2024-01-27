import { Test, TestingModule } from '@nestjs/testing';
import { StockInwardController } from './stock-inward.controller';
import { StockInwardService } from '../services/stock-inward.service';
import { EntityManager } from 'typeorm';
import { CreateStockInwardDto } from '../dto/create-stockinward.dto';

describe('StockInwardController', () => {
  let controller: StockInwardController;
  let service: StockInwardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockInwardController],
      providers: [
        {
          provide: StockInwardService,
          useValue: {
            create: jest.fn().mockResolvedValue('create'),
            findAll: jest.fn().mockResolvedValue('findAll'),
            findOne: jest.fn().mockResolvedValue('findOne'),
            update: jest.fn().mockResolvedValue('update'),
            remove: jest.fn().mockResolvedValue('remove'),
          },
        },
        { provide: EntityManager, useValue: {} },
      ],
    }).compile();

    controller = module.get<StockInwardController>(StockInwardController);
    service = module.get<StockInwardService>(StockInwardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create on service when create is called', async () => {
    const dto: CreateStockInwardDto = {
      stock: 10,
      supplierId: 1,
      productVariantId: 1,
    };
    expect(await controller.create(dto)).toBe('create');
    expect(service.create).toHaveBeenCalledTimes(1);
  });

  it('should call findAll on service when findAll is called', async () => {
    expect(await controller.findAll()).toBe('findAll');
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('should call findOne on service when findOne is called', async () => {
    expect(await controller.findOne(1)).toBe('findOne');
    expect(service.findOne).toHaveBeenCalledTimes(1);
  });

  it('should call update on service when update is called', async () => {
    const dto: CreateStockInwardDto = {
      stock: 20,
      supplierId: 2,
      productVariantId: 2,
    };
    expect(await controller.update(1, dto)).toBe('update');
    expect(service.update).toHaveBeenCalledTimes(1);
  });

  it('should call remove on service when remove is called', async () => {
    expect(await controller.remove(1)).toBe('remove');
    expect(service.remove).toHaveBeenCalledTimes(1);
  });
});