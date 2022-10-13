import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { ProductRepository } from './product.repository';

describe('User Repository', () => {
  let repository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRepository],
    }).compile();

    repository = module.get<ProductRepository>(ProductRepository);
  });

  afterEach(async () => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should get products', async () => {
    const findSpy = jest
      .spyOn(repository, 'query')
      .mockReturnValueOnce('any' as never);

    const rs = repository.getProducts(10, 0);

    await expect(rs).resolves.toBe('any');
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith(
      'SELECT * FROM "product" LIMIT 10 OFFSET 0;',
    );
  });
});
