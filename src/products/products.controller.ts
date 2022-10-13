import { Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';

import { ProductsService } from './products.service';
import Product from '../entities/product.entity';
import { QueryDto } from '../repositories/QueryDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  getProducts(@Query() query:QueryDto): Promise<Product[]> {
    console.log(query)
    return this.productsService.getProducts(query);
  }
}
