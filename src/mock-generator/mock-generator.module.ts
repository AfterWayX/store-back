import { Module } from '@nestjs/common';

import { MockGeneratorService } from './mock-generator.service';
import { MockGeneratorController } from './mock-generator.controller';
import { RepositoryModule } from '../repositories/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [MockGeneratorController],
  providers: [MockGeneratorService]
})
export class MockGeneratorModule {}
