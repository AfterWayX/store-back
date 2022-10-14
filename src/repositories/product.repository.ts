import { Injectable } from '@nestjs/common';
import { In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import Product from '../entities/product.entity';
import { QueryDto } from './QueryDto';
import { isArray } from 'class-validator';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getProducts(query?: QueryDto): Promise<Product[]> {
    const queryColors = [];
    const queryCategories = [];
    const queryNumbers = [];

    if (query.category) 
      if (isArray(query.category)) {
        query.category.forEach((c) => queryCategories.push(c));
      }
      else {
        queryCategories.push(query.category);
      }
      
    if (query.color)
      if (isArray(query.color)) {
        query.color.forEach((c) => queryColors.push(c));
      } else {
        queryColors.push(query.color);
      }

    if (query.price) 
      if (isArray(query.price)) {
        const sortedPrice = query.price.sort((a, b) => a - b);
        queryNumbers.push(sortedPrice[0] || 0);
        queryNumbers.push(sortedPrice[1] || 500);
      } else {
        queryNumbers.push(query.price || 0);
        queryNumbers.push(500);
      }

    const whereOptions = {
      ...(query.color && { color: In(queryColors) }),
      ...(query.category && { category: In(queryCategories) }),
      ...(query.price && { price: LessThanOrEqual(queryNumbers[1]) }),
      ...(query.price && { price: MoreThanOrEqual(queryNumbers[0]) }),
    };

    const response = await this.productRepository.find({
      where: whereOptions,
      skip: query.skip,
      take: query.limit,
    });

    return response;
  }

  async uploadMock(product) {
    return await this.productRepository.save(product);
  }
}
