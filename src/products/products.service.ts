import { Injectable } from '@nestjs/common';

import Product from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { QueryDto } from '../repositories/QueryDto';

@Injectable()
export class ProductsService {
    constructor(private readonly productRepository: ProductRepository) {}
    async getProducts(query: QueryDto): Promise<Product[]> {   
        console.log(query)
        return this.productRepository.getProducts(query); 
    }
}
