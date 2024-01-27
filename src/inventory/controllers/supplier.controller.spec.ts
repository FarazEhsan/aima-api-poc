import { Test, TestingModule } from '@nestjs/testing';
import { SupplierController } from './supplier.controller';
import { SupplierService } from '../services/supplier.service';
import { CreateSupplierDto } from '../dto/create-supplier.dto';

describe('SupplierController', () => {
  let controller: SupplierController;
  let service: SupplierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierController],
      providers: [
        {
          provide: SupplierService,
          useValue: {
            create: jest.fn().mockResolvedValue('create'),
            findAll: jest.fn().mockResolvedValue('findAll'),
            findOne: jest.fn().mockResolvedValue('findOne'),
            update: jest.fn().mockResolvedValue('update'),
            remove: jest.fn().mockResolvedValue('remove'),
          },
        },
        { provide: 'SupplierRepository', useValue: {} },
      ],
    }).compile();

    controller = module.get<SupplierController>(SupplierController);
    service = module.get<SupplierService>(SupplierService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create on service when create is called', async () => {
    const dto: CreateSupplierDto = {
      name: 'Test Supplier',
      address: 'Test Address',
      phone: '1234567890',
      email: 'test@test.com',
      contactPerson: 'Test Person',
      contactPersonPhone: '0987654321',
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
    const dto: CreateSupplierDto = {
      name: 'Updated Supplier',
      address: 'Updated Address',
      phone: '1122334455',
      email: 'updated@test.com',
      contactPerson: 'Updated Person',
      contactPersonPhone: '5566778899',
    };
    expect(await controller.update(1, dto)).toBe('update');
    expect(service.update).toHaveBeenCalledTimes(1);
  });

  it('should call remove on service when remove is called', async () => {
    expect(await controller.remove(1)).toBe('remove');
    expect(service.remove).toHaveBeenCalledTimes(1);
  });
});