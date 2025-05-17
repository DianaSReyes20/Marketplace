import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @Get('/')
  async getAll(): Promise<Product[]> {
    return await this.productsService.getAll();
  }

  @Get('seller/:sellerId')
  async getProductsBySeller(
    @Param('sellerId') sellerId: string,
  ): Promise<Product[]> {
    return await this.productsService.getProductsBySeller(+sellerId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product | null> {
    const product = await this.productsService.findOne(+id);
    return product ?? null;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.productsService.remove(+id);
  }
}
