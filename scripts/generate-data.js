const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');

const OUT_DIR = path.join(__dirname, '..', 'data');
const OUT_FILE = path.join(OUT_DIR, 'products.json');
const TOTAL = 10000;

const baseTags = ['electronics', 'subscription', 'premium'];
const quarterSchedule = [
  ['2026-01-01', '2026-03-31'],
  ['2026-04-01', '2026-06-30'],
  ['2026-07-01', '2026-09-30'],
  ['2026-10-01', '2026-12-31']
];

function randomTags() {
  // pick 1-3 tags
  const count = faker.datatype.number({ min: 1, max: 3 });
  return faker.helpers.shuffle(baseTags).slice(0, count);
}

function randomMetadata() {
  // keep structure: array of {key, value}
  return [
    { key: 'desig', value: faker.commerce.productAdjective().slice(0, 10) },
    { key: 'warranty', value: faker.helpers.arrayElement(['1 year', '2 years', '3 years']) }
  ];
}

function createItem(i) {
  return {
    id: i + 1,
    sku: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price(10, 2000, 2)),
    tags: randomTags(),
    metadata: randomMetadata(),
    pay_by_quarter: [1, 2, 3, 4],
    schedule: quarterSchedule,
    created_at: faker.date.between('2024-01-01', '2026-01-01').toISOString()
  };
}

console.log(`Generating ${TOTAL} items to ${OUT_FILE} ...`);
fs.mkdirSync(OUT_DIR, { recursive: true });

const items = [];
for (let i = 0; i < TOTAL; i++) {
  items.push(createItem(i));
}

fs.writeFileSync(OUT_FILE, JSON.stringify(items, null, 2), 'utf8');
console.log('Done.');
