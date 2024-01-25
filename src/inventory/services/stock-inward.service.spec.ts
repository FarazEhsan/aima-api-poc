import { Test, TestingModule } from '@nestjs/testing';
import { StockInwardService } from './stock-inward.service';

describe('StockInwardService', () => {
  let service: StockInwardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockInwardService],
    }).compile();

    service = module.get<StockInwardService>(StockInwardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
