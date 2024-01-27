import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantController } from './product-variant.controller';
import { ProductVariantService } from '../services/product-variant.service';
import { UpdateProductVariantDto } from '../dto/update-product-variant.dto';
import { ProductUnit } from '../../enums';
import { CreateProductVariantDto } from '../dto/create-product-variant.dto';


describe('ProductVariantController', () => {
  let controller: ProductVariantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVariantController],
      providers: [
        ProductVariantService,
        {
          provide: 'ProductVariantRepository',

          useValue: {
            find: jest.fn().mockResolvedValue([
              {
                updDate: '2024-01-26T02:17:58.289Z',
                updOperation: 0,
                createdBy: 1,
                id: 1,
                unit: 'PC',
                currentStock: 190,
                minimumStock: 5,
              },
            ]),
            findOne: jest.fn().mockResolvedValue({
              updDate: '2024-01-26T02:17:58.289Z',
              updOperation: 0,
              createdBy: 1,
              id: 1,
              unit: 'PC',
              currentStock: 190,
              minimumStock: 5,
            }),
            save: jest.fn().mockResolvedValue({
              unit: 'KG',
              currentStock: 100,
              minimumStock: 5,
              productId: 1,
              updDate: '2024-01-27T04:10:09.234Z',
              updOperation: 0,
              createdBy: 1,
              id: 2,
            }),
            update: jest.fn().mockResolvedValue({
              generatedMaps: [],
              raw: [],
              affected: 1,
            }),
            delete: jest.fn().mockResolvedValue({
              "raw": [],
              "affected": 1
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductVariantController>(ProductVariantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all product variants', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      {
        updDate: '2024-01-26T02:17:58.289Z',
        updOperation: 0,
        createdBy: 1,
        id: 1,
        unit: 'PC',
        currentStock: 190,
        minimumStock: 5,
      },
    ]);
  });

  it('should get one product variant', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      updDate: '2024-01-26T02:17:58.289Z',
      updOperation: 0,
      createdBy: 1,
      id: 1,
      unit: 'PC',
      currentStock: 190,
      minimumStock: 5,
    });
  });

  it('should create a product variant', async () => {
    const newProductVariant = new CreateProductVariantDto();
    newProductVariant.unit =  ProductUnit.KILOGRAM;
    newProductVariant.currentStock = 100;
    newProductVariant.minimumStock = 5;
    newProductVariant.productId = 1;
    const result = await controller.create(newProductVariant);
    expect(result).toEqual({
      unit: 'KG',
      currentStock: 100,
      minimumStock: 5,
      productId: 1,
      updDate: '2024-01-27T04:10:09.234Z',
      updOperation: 0,
      createdBy: 1,
      id: 2,
    });
  });

  it('should update a product variant', async () => {
    const updatedProductVariant = new UpdateProductVariantDto();
    updatedProductVariant.unit = ProductUnit.KILOGRAM;
    updatedProductVariant.currentStock = 200;
    updatedProductVariant.minimumStock = 10;
    const result = await controller.update(1, updatedProductVariant);
    expect(result).toEqual({
      generatedMaps: [],
      raw: [],
      affected: 1,
    });
  });

  it('should delete a product variant', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({
      raw: [],
      affected: 1,
    });
  });
});
