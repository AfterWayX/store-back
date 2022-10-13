import { Post } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { MockGeneratorService } from './mock-generator.service';

@Controller('mock-generator')
export class MockGeneratorController {
  constructor(private readonly mockGeneratorService: MockGeneratorService) {}

  @Post('')
  async generateMock(@Query('howMany') howMany: number) { return await this.mockGeneratorService.generate(howMany); }
}
