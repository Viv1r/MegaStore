import { Test, TestingModule } from '@nestjs/testing';
import { SalesCrmController } from './sales-crm.controller';

describe('SalesCrmController', () => {
  let controller: SalesCrmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesCrmController],
    }).compile();

    controller = module.get<SalesCrmController>(SalesCrmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
