import { Injectable } from '@nestjs/common';

import Product from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { QueryDto } from '../repositories/QueryDto';
import { FilterFieldsI } from '../products/interfaces/FilterFields.interface';
import { Products } from './interfaces/Products.interface';

@Injectable()
export class ProductsService {
    constructor(private readonly productRepository: ProductRepository) {}
    async products(query: QueryDto): Promise<Products> {
        return this.productRepository.products(query); 
    }

    async filterFields(): Promise<FilterFieldsI> {
        return this.productRepository.filterFields(); 
    }
}
