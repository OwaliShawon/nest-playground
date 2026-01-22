import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ProductsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  create(createProductDto: any) {
    return this.repository.save(createProductDto);
  }

  // findAll() {
  //   // const productsWithSpecificMeta =
  //   //   this.repository
  //   //     .createQueryBuilder("product")
  //   //     .where("product.metadata @> :meta", { meta: [{ key: "desig", value: "owali" }] })
  //   //     .getMany();
  //   //     console.log(productsWithSpecificMeta);
  //   return this.repository.find();
  // }

  async findAll(filter?: { quarter?: number; meta?: any }) {
    console.log('Filter received in service:', filter);
    const qb = this.repository.createQueryBuilder('product');

    let whereApplied = false;

    if (filter?.quarter !== undefined && filter?.quarter !== null) {
      qb.where(':quarter = ANY(product.pay_by_quarter)', {
        quarter: filter.quarter,
      });
      whereApplied = true;
    }

    // if (filter?.meta !== undefined && filter?.meta !== null) {
    //   const metaParam = JSON.stringify(filter.meta);
    //   if (whereApplied) {
    //     qb.andWhere('product.metadata @> :meta', { meta: metaParam });
    //   } else {
    //     qb.where('product.metadata @> :meta', { meta: metaParam });
    //     whereApplied = true;
    //   }
    // }

    const result = await this.dataSource.query(`
  EXPLAIN ANALYZE
  SELECT *
  FROM product
  WHERE pay_by_quarter @> ARRAY[2];
`);

    // await this.cacheManager.set('custom_key', await qb.getMany());
    // console.log('Query Execution Plan:', result);

    // const value = await this.cacheManager.get('custom_key');
    // console.log('Cached Value:', value);

    return qb.getMany();
  }

  findOne(id: number) {
    const set = new Set();
    set.add(1);
    const map = new Map();
    map.set('a', 1);
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
