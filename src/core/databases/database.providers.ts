import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { InvoiceMaster } from '../../invoice_master/entities/invoice_master.entity';
import { InvoiceDetail } from '../../invoice_details/entities/invoice_detail.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Product, InvoiceMaster, InvoiceDetail],
  migrations:
    process.env.NODE_ENV === 'production'
      ? ['dist/core/databases/migrations/*-migrations.js']
      : ['src/core/databases/migrations/*-migrations.ts'],
  synchronize: true,
  logging: true,
});

export const databaseProviders = [
  {
    provide: DataSource,
    useValue: AppDataSource,
  },
];
