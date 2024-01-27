import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let repo: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
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

    service = module.get<ProductService>(ProductService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call save on create', async () => {
    const dto: CreateProductDto = {
      productName: 'Test Product',
      productDescription: 'Test Description',
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
    const dto: UpdateProductDto = {
      productName: 'Updated Product',
      productDescription: 'Updated Description',
    };
    expect(await service.update(1, dto)).toBe('update');
    expect(repo.update).toHaveBeenCalledTimes(1);
  });

  it('should call delete on remove', async () => {
    expect(await service.remove(1)).toBe('delete');
    expect(repo.delete).toHaveBeenCalledTimes(1);
  });
});