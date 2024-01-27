import { Test, TestingModule } from '@nestjs/testing';
import { SaleController } from './sale.controller';
import { SaleService } from '../services/sale.service';
import { EntityManager } from 'typeorm';
import { CreateSalesDto } from '../dto/create-sale.dto';

describe('SaleController', () => {
  let controller: SaleController;
  let service: SaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleController],
      providers: [
        {
          provide: SaleService,
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

    controller = module.get<SaleController>(SaleController);
    service = module.get<SaleService>(SaleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create on service when create is called', async () => {
    const dto: CreateSalesDto = {
      productVariantId: 1,
      quantity: 10,
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
    const dto: CreateSalesDto = {
      productVariantId: 2,
      quantity: 20,
    };
    expect(await controller.update(1, dto)).toBe('update');
    expect(service.update).toHaveBeenCalledTimes(1);
  });

  it('should call remove on service when remove is called', async () => {
    expect(await controller.remove(1)).toBe('remove');
    expect(service.remove).toHaveBeenCalledTimes(1);
  });
});