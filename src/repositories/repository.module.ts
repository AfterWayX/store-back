import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { ProductRepository } from "./product.repository";
import { ConnectionsModule } from "../connections/connections.module";
import Product from '../entities/product.entity';

@Module({
  imports: [ConnectionsModule, TypeOrmModule.forFeature([Product])],
  controllers: [],
  providers: [ProductRepository],
  exports: [ProductRepository],
})
export class RepositoryModule {}
