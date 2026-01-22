import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Index('idx_product_tags_gin', ['tags'])
@Index('idx_product_metadata_gin', ['metadata'])
@Index('idx_product_pay_by_quarter_gin', ['pay_by_quarter'])
@Index('idx_product_schedule_gin', ['schedule'])
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Index()
  email: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  tags: string[]; // Example: an array of strings

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  // Example: an array of objects
  metadata: { key: string; value: string }[];

  @Column('int', { array: true, nullable: true })
  pay_by_quarter: number[];

  @Column('text', { array: true, nullable: true })
  schedule: string[][];
}
