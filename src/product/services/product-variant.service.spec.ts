import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantService } from './product-variant.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductVariant } from '../entities/productvariant.entity';
import { CreateProductVariantDto } from '../dto/create-product-variant.dto';
import { UpdateProductVariantDto } from '../dto/update-product-variant.dto';
import { ProductUnit } from '../../enums';
import { ProductService } from '../product.service';

describe('ProductVariantService', () => {
  let service: ProductVariantService;
  let repo: Repository<ProductVariant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductVariantService,
        {
          provide: getRepositoryToken(ProductVariant),
          useValue: {
            save: jest.fn().mockResolvedValue('save'),
            find: jest.fn().mockResolvedValue('find'),
            findOne: jest.fn().mockResolvedValue('findOne'),
            update: jest.fn().mockResolvedValue('update'),
            delete: jest.fn().mockResolvedValue('delete'),
          },
        },
        { provide: ProductService, useValue: {
          findOne:jest.fn().mockResolvedValue({}),
          
        } },
      ],
    }).compile();

    service = module.get<ProductVariantService>(ProductVariantService);
    repo = module.get<Repository<ProductVariant>>(getRepositoryToken(ProductVariant));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call save on create', async () => {
    const dto: CreateProductVariantDto = {
      unit: ProductUnit.KILOGRAM,
      currentStock: 10,
      minimumStock: 5,
      productId: 1,
    };
    expect(await service.create(dto)).toBe('save');
    expect(repo.save).toHaveBeenCalledTimes(1);
  });

  it('should call find on findAll', async () => {
    expect(await service.findAll()).toBe('find');
    expect(repo.find).toHaveBeenCalledTimes(1);
  });

  it('should call findOne on findOne', async () => {
    expect(await service.findOne(1)).toBe('findOne');
    expect(repo.findOne).toHaveBeenCalledTimes(1);
  });

  it('should call update on update', async () => {
    const dto: UpdateProductVariantDto = {
      unit: ProductUnit.KILOGRAM,
      currentStock: 20,
      minimumStock: 10,
      productId: 2,
    };
    expect(await service.update(1, dto)).toBe('update');
    expect(repo.update).toHaveBeenCalledTimes(1);
  });

  it('should call delete on remove', async () => {
    expect(await service.remove(1)).toBe('delete');
    expect(repo.delete).toHaveBeenCalledTimes(1);
  });
});