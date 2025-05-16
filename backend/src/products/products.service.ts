import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productsRepository.create(productData);
    return this.productsRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `No se ha encontrado un producto con ID ${id}`,
      );
    }
  }

  async update(
    id: number,
    updateproductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productsRepository.update(id, updateproductDto);
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`No se ha encontrado un producto con ID ${id}`);
    }
    return product;
  }

  async findOne(id: number): Promise<Product | undefined> {
    const product = await this.productsRepository.findOne({ where: { id } });
    return product ?? undefined;
  }
}
