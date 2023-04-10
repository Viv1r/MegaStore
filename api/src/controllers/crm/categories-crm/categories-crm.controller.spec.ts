import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesCrmController } from './categories-crm.controller';

describe('CategoriesCrmController', () => {
  let controller: CategoriesCrmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesCrmController],
    }).compile();

    controller = module.get<CategoriesCrmController>(CategoriesCrmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
