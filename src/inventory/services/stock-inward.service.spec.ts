import { Test, TestingModule } from '@nestjs/testing';
import { StockInwardService } from './stock-inward.service';
import { EntityManager, Repository } from 'typeorm';
import { CreateStockInwardDto } from '../dto/create-stockinward.dto';
import { StockInward } from '../entities/stockinward.entity';

describe('StockInwardService', () => {
  let service: StockInwardService;
  let entityManager: EntityManager;
  let stockInwardRepository: Repository<StockInward>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockInwardService,
        {
          provide: 'StockInwardRepository',
          useValue: {
            find: jest.fn().mockResolvedValue('find'),
            findOne: jest.fn().mockResolvedValue('findOne'),
            update: jest.fn().mockResolvedValue('update'),
            delete: jest.fn().mockResolvedValue('delete'),
          },
        },
        {
          provide: EntityManager,
          useValue: {
            transaction: jest.fn().mockImplementation((cb) => cb({
              findOne: jest.fn().mockResolvedValue({ currentStock: 10 }),
              save: jest.fn().mockResolvedValue('save'),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<StockInwardService>(StockInwardService);
    entityManager = module.get<EntityManager>(EntityManager);
    stockInwardRepository = module.get('StockInwardRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create on service when create is called', async () => {
    const dto: CreateStockInwardDto = {
      productVariantId: 1,
      supplierId: 1,
      stock: 5,
    };
    const findOneMock = jest.fn().mockResolvedValue({ currentStock: 10 });
    const saveMock = jest.fn().mockResolvedValue('save');
    (entityManager.transaction as jest.Mock).mockImplementation((cb) => cb({
      findOne: findOneMock,
      save: saveMock,
    }));
    await service.create(dto);
    expect(findOneMock).toHaveBeenCalledTimes(2);
    expect(saveMock).toHaveBeenCalledTimes(2);
  });

  it('should call find on repository when findAll is called', async () => {
    expect(await service.findAll()).toBe('find');
    expect(stockInwardRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should call findOne on repository when findOne is called', async () => {
    expect(await service.findOne(1)).toBe('findOne');
    expect(stockInwardRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should call update on repository when update is called', async () => {
    const dto: CreateStockInwardDto = {
      productVariantId: 2,
      supplierId: 2,
      stock: 10,
    };
    expect(await service.update(1, dto)).toBe('update');
    expect(stockInwardRepository.update).toHaveBeenCalledTimes(1);
  });

  it('should call delete on repository when remove is called', async () => {
    expect(await service.remove(1)).toBe('delete');
    expect(stockInwardRepository.delete).toHaveBeenCalledTimes(1);
  });
});