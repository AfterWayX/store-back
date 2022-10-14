import { Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';

import { ProductsService } from './products.service';
import Product from '../entities/product.entity';
import { QueryDto } from '../repositories/QueryDto';
import { FilterFieldsI } from './interfaces/FilterFields.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  products(@Query() query:QueryDto): Promise<Product[]> {
    return this.productsService.products(query);
  }

  @Get('fields')
  filterFields(): Promise<FilterFieldsI> {
    return this.productsService.filterFields();
  }
}
