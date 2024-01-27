import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: 'ProductRepository',
          useValue: {
            find: jest.fn().mockResolvedValue([
              {
                updDate: '2024-01-25T23:51:24.940Z',
                updOperation: 0,
                createdBy: 1,
                id: 2,
                productName: 'Soap',
                productDescription:
                  'very good soap, the description must be longer than 50 chars',
              },
            ]),
            findOne: jest.fn().mockResolvedValue({
              updDate: '2024-01-25T23:51:24.940Z',
              updOperation: 0,
              createdBy: 1,
              id: 2,
              productName: 'Soap',
              productDescription:
                'very good soap, the description must be longer than 50 chars',
            }),
            save: jest.fn().mockResolvedValue({
              productName: 'Shampoo',
              productDescription:
                'Very good shampoo with a good description that is longer than 50 chars',
              updDate: '2024-01-27T02:57:02.730Z',
              updOperation: 0,
              createdBy: 1,
              id: 3,
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

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all products', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      {
        updDate: '2024-01-25T23:51:24.940Z',
        updOperation: 0,
        createdBy: 1,
        id: 2,
        productName: 'Soap',
        productDescription:
          'very good soap, the description must be longer than 50 chars',
      },
    ]);
  });

  it('should get one product', async () => {
    const result = await controller.findOne(2);
    expect(result).toEqual({
      updDate: '2024-01-25T23:51:24.940Z',
      updOperation: 0,
      createdBy: 1,
      id: 2,
      productName: 'Soap',
      productDescription:
        'very good soap, the description must be longer than 50 chars',
    });
  });

  it('should create a product', async () => {
    const newProduct = {
      productName: 'Shampoo',
      productDescription:
        'Very good shampoo with a good description that is longer than 50 chars',
    };
    const result = await controller.create(newProduct);
    expect(result).toEqual({
      productName: 'Shampoo',
      productDescription:
        'Very good shampoo with a good description that is longer than 50 chars',
      updDate: '2024-01-27T02:57:02.730Z',
      updOperation: 0,
      createdBy: 1,
      id: 3,
    });
  });

  it('should update a product', async () => {
    const updatedProduct = {
      productName: 'Updated Soap',
      productDescription:
        'Updated description that is longer than 50 chars',
    };
    const result = await controller.update(2, updatedProduct);
    expect(result).toEqual({
      generatedMaps: [],
      raw: [],
      affected: 1,
    });
  });

  it('should delete a product', async () => {
    const result = await controller.remove(2);
    expect(result).toEqual({
      raw: [],
      affected: 1,
    });
  });
});
