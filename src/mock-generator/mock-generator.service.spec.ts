import { Test, TestingModule } from '@nestjs/testing';
import { MockGeneratorService } from './mock-generator.service';

describe('MockGeneratorService', () => {
  let service: MockGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockGeneratorService],
    }).compile();

    service = module.get<MockGeneratorService>(MockGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
