import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryService } from './product-category.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductCategory } from '../entities/productcategory.entity';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';

describe('ProductCategoryService', () => {
  let service: ProductCategoryService;
  let repo: Repository<ProductCategory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCategoryService,
        {
          provide: getRepositoryToken(ProductCategory),
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

    service = module.get<ProductCategoryService>(ProductCategoryService);
    repo = module.get<Repository<ProductCategory>>(getRepositoryToken(ProductCategory));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call save on create', async () => {
    const dto: CreateProductCategoryDto = {
      name: 'Test Category',
      description: 'Test Description',
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
    const dto: CreateProductCategoryDto = {
      name: 'Updated Category',
      description: 'Updated Description',
    };
    expect(await service.update(1, dto)).toBe('update');
    expect(repo.update).toHaveBeenCalledTimes(1);
  });

  it('should call delete on remove', async () => {
    expect(await service.remove(1)).toBe('delete');
    expect(repo.delete).toHaveBeenCalledTimes(1);
  });
});