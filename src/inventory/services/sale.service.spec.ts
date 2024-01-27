import { Test, TestingModule } from '@nestjs/testing';
import { SaleService } from './sale.service';
import { EntityManager, Repository } from 'typeorm';
import { CreateSalesDto } from '../dto/create-sale.dto';
import { Sales } from '../entities/sale.entity';

describe('SaleService', () => {
  let service: SaleService;
  let entityManager: EntityManager;
  let salesRepository: Repository<Sales>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleService,
        {
          provide: 'SalesRepository',
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

    service = module.get<SaleService>(SaleService);
    entityManager = module.get<EntityManager>(EntityManager);
    salesRepository = module.get('SalesRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create on service when create is called', async () => {
    const dto: CreateSalesDto = {
      productVariantId: 1,
      quantity: 5,
    };
    const findOneMock = jest.fn().mockResolvedValue({ currentStock: 10 });
    const saveMock = jest.fn().mockResolvedValue('save');
    (entityManager.transaction as jest.Mock).mockImplementation((cb) => cb({
      findOne: findOneMock,
      save: saveMock,
    }));
    await service.create(dto);
    expect(findOneMock).toHaveBeenCalledTimes(1);
    expect(saveMock).toHaveBeenCalledTimes(2);
  });

  it('should call find on repository when findAll is called', async () => {
    expect(await service.findAll()).toBe('find');
    expect(salesRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should call findOne on repository when findOne is called', async () => {
    expect(await service.findOne(1)).toBe('findOne');
    expect(salesRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should call update on repository when update is called', async () => {
    const dto: CreateSalesDto = {
      productVariantId: 2,
      quantity: 10,
    };
    expect(await service.update(1, dto)).toBe('update');
    expect(salesRepository.update).toHaveBeenCalledTimes(1);
  });

  it('should call delete on repository when remove is called', async () => {
    expect(await service.remove(1)).toBe('delete');
    expect(salesRepository.delete).toHaveBeenCalledTimes(1);
  });
});