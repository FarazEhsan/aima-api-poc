import { Test, TestingModule } from '@nestjs/testing';
import { InverntoryController } from './inverntory.controller';
import { InverntoryService } from './inverntory.service';

describe('InverntoryController', () => {
  let controller: InverntoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InverntoryController],
      providers: [InverntoryService],
    }).compile();

    controller = module.get<InverntoryController>(InverntoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
