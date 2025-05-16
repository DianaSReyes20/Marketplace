import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    private productsService: ProductsService,
  ) {}

  async getAllByUser(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'], // Carga los items y productos relacionados
      order: { createdAt: 'DESC' }, // Ordena por fecha creación descendente
    });
  }

  async findOne(id: number, userId: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['items', 'items.product', 'user'], // Carga relaciones
    });

    if (!order) {
      throw new NotFoundException(`No se ha encontrado una orden con ID ${id}`);
    }

    return order;
  }

  async create(userId: number, dto: CreateOrderDto) {
    const order = this.ordersRepository.create({ user: { id: userId } });
    const items = await Promise.all(
      dto.items.map(async (item) => {
        const product = await this.productsService.findOne(item.productId);
        if (!product) {
          throw new Error(
            `No se ha encontrado un producto con ID ${item.productId}`,
          );
        }
        return this.orderItemsRepository.create({
          product,
          quantity: item.quantity,
          price: product.price,
        });
      }),
    );
    order.items = items;
    order.total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return this.ordersRepository.save(order);
  }
}
