import { Test, TestingModule } from '@nestjs/testing';
import { SupplierService } from './supplier.service';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { Supplier } from '../entities/supplier.entity';

describe('SupplierService', () => {
  let service: SupplierService;
  let supplierRepository: Repository<Supplier>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupplierService,
        {
          provide: 'SupplierRepository',
          useValue: {
            save: jest.fn().mockResolvedValue('save'),
            find: jest.fn().mockResolvedValue('find'),
            findOne: jest.fn().mockResolvedValue('findOne'),
            update: jest.fn().mockResolvedValue('update'),
            delete: jest.fn().mockResolvedValue('delete'),
          },
        },
      ],
    }).compile();

    service = module.get<SupplierService>(SupplierService);
    supplierRepository = module.get('SupplierRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call save on repository when create is called', async () => {
    const dto: CreateSupplierDto = {
      name: 'Test',
      address: 'Test Address',
      phone: '1234567890',
      email: 'test@test.com',
      contactPerson: 'Test Person',
      contactPersonPhone: '0987654321',
    };
    expect(await service.create(dto)).toBe('save');
    expect(supplierRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should call find on repository when findAll is called', async () => {
    expect(await service.findAll()).toBe('find');
    expect(supplierRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should call findOne on repository when findOne is called', async () => {
    expect(await service.findOne(1)).toBe('findOne');
    expect(supplierRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should call update on repository when update is called', async () => {
    const dto: CreateSupplierDto = {
      name: 'Test Updated',
      address: 'Test Address Updated',
      phone: '1234567890',
      email: 'testupdated@test.com',
      contactPerson: 'Test Person Updated',
      contactPersonPhone: '0987654321',
    };
    expect(await service.update(1, dto)).toBe('update');
    expect(supplierRepository.update).toHaveBeenCalledTimes(1);
  });

  it('should call delete on repository when remove is called', async () => {
    expect(await service.remove(1)).toBe('delete');
    expect(supplierRepository.delete).toHaveBeenCalledTimes(1);
  });
});