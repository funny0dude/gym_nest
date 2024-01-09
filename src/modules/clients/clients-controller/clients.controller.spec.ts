import { Test, TestingModule } from '@nestjs/testing';
import { ClientsControllerController } from './clients.controller';

describe('ClientsControllerController', () => {
  let controller: ClientsControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsControllerController],
    }).compile();

    controller = module.get<ClientsControllerController>(
      ClientsControllerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
