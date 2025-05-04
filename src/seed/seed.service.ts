import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { Product } from 'src/products/entities';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async executeSeed() {
    await this.insertNewProducts();
    return 'Seed executed';
  }

  private async insertNewProducts() {
    await this.productService.deleteAllProducts();

    const products = initialData.products;
    const insertPromises: Promise<Product | undefined>[] = [];

    products.forEach((product) => {
      insertPromises.push(this.productService.create(product));
    });

    await Promise.all(insertPromises);
  }
}
