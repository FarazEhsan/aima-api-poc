import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from '../services/product-category.service';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';

describe('ProductCategoryController', () => {
  let controller: ProductCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCategoryController],
      providers: [
        ProductCategoryService,
        {
          provide: 'ProductCategoryRepository',
          useValue: {
            find: jest.fn().mockResolvedValue([
              {
                updDate: '2024-01-25T15:14:34.029Z',
                updOperation: 0,
                createdBy: 1,
                id: 1,
                name: 'Appliances',
                description: 'Washing machines, TV etc.',
              },
            ]),
            findOne: jest.fn().mockResolvedValue({
              updDate: '2024-01-25T15:14:34.029Z',
              updOperation: 0,
              createdBy: 1,
              id: 1,
              name: 'Appliances',
              description: 'Washing machines, TV etc.',
            }),
            save: jest.fn().mockResolvedValue({
              name: 'Furniture',
              description: 'very good description',
              updDate: '2024-01-27T03:42:55.129Z',
              updOperation: 0,
              createdBy: 1,
              id: 7,
            }),
            update: jest.fn().mockResolvedValue({
              generatedMaps: [],
              raw: [],
              affected: 1,
            }),
            delete: jest.fn().mockResolvedValue({
              raw: [],
              affected: 1,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductCategoryController>(
      ProductCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product category', async () => {
    const newProductCategory = new CreateProductCategoryDto();
    newProductCategory.name = 'Furniture';
    newProductCategory.description = 'very good description';
    const result = await controller.create(newProductCategory);
    expect(result).toEqual({
      name: 'Furniture',
      description: 'very good description',
      updDate: '2024-01-27T03:42:55.129Z',
      updOperation: 0,
      createdBy: 1,
      id: 7,
    });
  });

  it('should get all product categories', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      {
        updDate: '2024-01-25T15:14:34.029Z',
        updOperation: 0,
        createdBy: 1,
        id: 1,
        name: 'Appliances',
        description: 'Washing machines, TV etc.',
      },
    ]);
  });

  it('should get one product category', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      updDate: '2024-01-25T15:14:34.029Z',
      updOperation: 0,
      createdBy: 1,
      id: 1,
      name: 'Appliances',
      description: 'Washing machines, TV etc.',
    });
  });

  it('should update a product category', async () => {
    const updatedProductCategory = new CreateProductCategoryDto();
    updatedProductCategory.name = 'Updated Appliances';
    updatedProductCategory.description = 'Updated description';
    const result = await controller.update(1, updatedProductCategory);
    expect(result).toEqual({
      generatedMaps: [],
      raw: [],
      affected: 1,
    });
  });

  it('should delete a product category', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({
      raw: [],
      affected: 1,
    });
  });
});
