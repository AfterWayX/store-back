import { Test, TestingModule } from '@nestjs/testing';
import { MockGeneratorController } from './mock-generator.controller';
import { MockGeneratorService } from './mock-generator.service';

describe('MockGeneratorController', () => {
  let controller: MockGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockGeneratorController],
      providers: [MockGeneratorService],
    }).compile();

    controller = module.get<MockGeneratorController>(MockGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
