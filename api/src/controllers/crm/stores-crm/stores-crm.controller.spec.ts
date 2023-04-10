import { Test, TestingModule } from '@nestjs/testing';
import { StoresCrmController } from './stores-crm.controller';

describe('StoresCrmController', () => {
  let controller: StoresCrmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoresCrmController],
    }).compile();

    controller = module.get<StoresCrmController>(StoresCrmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
