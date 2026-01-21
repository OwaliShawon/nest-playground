import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { AppDataSource } from '../src/core/databases/database.providers';
import { Product } from '../src/products/entities/product.entity';

dotenv.config();

async function main() {
  const file = path.join(__dirname, '..', 'data', 'products.json');
  if (!fs.existsSync(file)) {
    console.error('data/products.json not found. Run generate:data first.');
    process.exit(1);
  }

  const raw = fs.readFileSync(file, 'utf8');
  const items = JSON.parse(raw);

  await AppDataSource.initialize();
  console.log('DB initialized');

  const repo = AppDataSource.getRepository(Product);

  const batchSize = 1000;
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize).map((it: any) => ({
      tags: it.tags,
      metadata: it.metadata,
      pay_by_quarter: it.pay_by_quarter,
      schedule: it.schedule,
    }));

    console.log(`Inserting batch ${i / batchSize + 1} (${batch.length} items)`);
    await repo.save(batch);
  }

  console.log('Import complete');
  await AppDataSource.destroy();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
