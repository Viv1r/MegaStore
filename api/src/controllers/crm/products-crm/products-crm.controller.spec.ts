import { Test, TestingModule } from '@nestjs/testing';
import { ProductsCrmController } from './products-crm.controller';

describe('ProductsCrmController', () => {
  let controller: ProductsCrmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsCrmController],
    }).compile();

    controller = module.get<ProductsCrmController>(ProductsCrmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
