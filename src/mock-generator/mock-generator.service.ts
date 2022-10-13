import { Injectable } from '@nestjs/common';

import { ProductRepository } from '../repositories/product.repository';
import * as categoriesList from './mock-jsons/categories.json';
import * as colorsList from './mock-jsons/colors.json';
import * as namesList from './mock-jsons/names.json';
import * as pricesList from './mock-jsons/prices.json';


@Injectable()
export class MockGeneratorService {
    constructor(private readonly productRepository: ProductRepository) {}

    async generate(howMany: number) {
        for (let index = 0; index < howMany; index++) {
            const color = colorsList[Math.floor(Math.random() * 50)].color
            const category = categoriesList[Math.floor(Math.random() * 70)]
            const name = namesList[Math.floor(Math.random() * 1000)].animal
            const price = Math.floor(Math.random() * 501)
            await this.productRepository.uploadMock({
                category: category ,
                color: color,
                name: name,
                price: price,
            });
        }
    }
}
