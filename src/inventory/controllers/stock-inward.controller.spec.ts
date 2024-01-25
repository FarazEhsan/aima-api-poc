import { Test, TestingModule } from '@nestjs/testing';
import { StockInwardController } from './stock-inward.controller';

describe('StockInwardController', () => {
  let controller: StockInwardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockInwardController],
    }).compile();

    controller = module.get<StockInwardController>(StockInwardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
