import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

import { validate as isUUID } from 'uuid';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handlerExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    const offset = (page - 1) * limit;

    const [data, total] = await this.productRepository.findAndCount({
      take: limit,
      skip: offset,
      // TODO: Relaciones
    });

    const totalPages = Math.ceil(total / limit);

    return {
      pagination: {
        page,
        total,
        limit,
        pages: totalPages,
      },
      data,
    };
  }

  async findOne(term: string) {
    let conditionSearch: object = { id: term };

    if (!isUUID(term)) {
      conditionSearch = { slug: term.toLowerCase() };
    }

    const product = await this.productRepository.findOneBy(conditionSearch);

    if (!product) {
      throw new NotFoundException(`Product with ${term} not found`);
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);

    return {
      message: `Product with id ${id} deleted`,
    };
  }

  private handlerExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs.',
    );
  }
}
